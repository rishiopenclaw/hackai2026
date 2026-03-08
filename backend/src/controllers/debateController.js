import mongoose from 'mongoose';
import { DebateSession } from '../models/DebateSession.js';
import { analyzeSpeech, judgeDebate } from '../services/gemini.js';

const DEFAULT_TOPICS = [
  'Should remote work replace office-first culture?',
  'Is AI more helpful than harmful for students?',
  'Should social media platforms verify all users?',
  'Is a 4-day workweek better for productivity?',
  'Should college be free for all students?',
];

function pickTopic(explicitTopic) {
  if (explicitTopic && typeof explicitTopic === 'string') return explicitTopic;
  return DEFAULT_TOPICS[Math.floor(Math.random() * DEFAULT_TOPICS.length)];
}

function toRole(speaker) {
  return speaker === 'A' ? 'speakerA' : 'speakerB';
}

function toPhase(speaker, turnIndex) {
  if (turnIndex <= 1) {
    return speaker === 'A' ? 'openingA' : 'openingB';
  }
  return speaker === 'A' ? 'rebuttalA' : 'rebuttalB';
}

function expectedSpeaker(turnIndex) {
  return turnIndex % 2 === 0 ? 'A' : 'B';
}

function nextPhaseFromTurnCount(turnCount) {
  if (turnCount === 1) return 'openingB';
  if (turnCount === 2) return 'rebuttalA';
  if (turnCount === 3) return 'rebuttalB';
  if (turnCount >= 4) return 'analysis';
  return 'openingA';
}

function baselineMetrics() {
  return {
    transcript: '',
    filler_count: 0,
    filler_words: [],
    wpm: 0,
    pause_count: 0,
    avg_pause_duration: 0,
    tonality_score: 0,
    grammar_score: 0,
    structure_score: 0,
    argument_strength: 0,
    confidence_score: 0,
    overall_score: 0,
    top_strength: '',
    top_weakness: '',
    one_line_feedback: '',
  };
}

export async function startDebate(req, res, next) {
  try {
    const { topic, mode = 'p2p', speakerAUserId, speakerBUserId = null } = req.body || {};
    if (mode !== 'p2p') {
      return res.status(400).json({ error: 'Only p2p mode is currently supported for this endpoint.' });
    }

    const resolvedSpeakerA =
      speakerAUserId && mongoose.Types.ObjectId.isValid(speakerAUserId)
        ? speakerAUserId
        : new mongoose.Types.ObjectId();

    const session = await DebateSession.create({
      mode: 'p2p',
      topicPrompt: pickTopic(topic),
      speakerAUserId: resolvedSpeakerA,
      speakerBUserId: speakerBUserId && mongoose.Types.ObjectId.isValid(speakerBUserId) ? speakerBUserId : null,
      currentPhase: 'openingA',
      turns: [],
      startedAt: new Date(),
    });

    res.status(201).json({
      debateId: session._id,
      topic: session.topicPrompt,
    });
  } catch (error) {
    next(error);
  }
}

export async function submitDebateTurn(req, res, next) {
  try {
    const { debateId, speaker, turnIndex, audioBase64, mimeType } = req.body || {};

    if (!debateId || !speaker || typeof turnIndex !== 'number' || !audioBase64) {
      return res.status(400).json({
        error: 'debateId, speaker, turnIndex, and audioBase64 are required.',
      });
    }

    if (!['A', 'B'].includes(speaker)) {
      return res.status(400).json({ error: 'speaker must be "A" or "B".' });
    }
    if (!Number.isInteger(turnIndex) || turnIndex < 0 || turnIndex > 3) {
      return res.status(400).json({ error: 'turnIndex must be an integer in [0, 3].' });
    }

    const debate = await DebateSession.findById(debateId);
    if (!debate) return res.status(404).json({ error: 'Debate session not found.' });
    if (debate.currentPhase === 'analysis' || debate.currentPhase === 'completed') {
      return res.status(400).json({ error: 'Debate already finished.' });
    }
    if (debate.turns.length >= 4) {
      return res.status(400).json({ error: 'This debate already has 4 turns.' });
    }
    if (turnIndex !== debate.turns.length) {
      return res.status(400).json({
        error: `turnIndex out of sequence. Expected ${debate.turns.length}.`,
      });
    }
    const expected = expectedSpeaker(turnIndex);
    if (speaker !== expected) {
      return res.status(400).json({
        error: `Invalid speaker for turn ${turnIndex}. Expected "${expected}".`,
      });
    }

    const analyzed = await analyzeSpeech({
      audioBase64,
      mimeType,
      context: { topic: debate.topicPrompt, speaker, exerciseType: 'debate' },
    });
    const metrics = { ...baselineMetrics(), ...(analyzed || {}) };

    debate.turns.push({
      speaker,
      turnIndex,
      mimeType: mimeType || 'audio/webm',
      metrics,
      role: toRole(speaker),
      phase: toPhase(speaker, turnIndex),
      allocatedSeconds: 15,
      startedAt: new Date(),
      endedAt: new Date(),
      transcript: metrics.transcript || '',
    });

    const totalTurns = debate.turns.length;
    debate.currentPhase = nextPhaseFromTurnCount(totalTurns);
    await debate.save();

    res.status(201).json({
      ok: true,
      debateId,
      turnIndex,
      speaker,
      nextSpeaker: totalTurns < 4 ? expectedSpeaker(totalTurns) : null,
      turnsRecorded: totalTurns,
      metrics,
    });
  } catch (error) {
    next(error);
  }
}

export async function finishDebate(req, res, next) {
  try {
    const { debateId } = req.body || {};
    if (!debateId) return res.status(400).json({ error: 'debateId is required.' });

    const debate = await DebateSession.findById(debateId);
    if (!debate) return res.status(404).json({ error: 'Debate session not found.' });
    if (debate.currentPhase === 'completed') {
      return res.json({ ok: true, debateId, result: debate.result || null });
    }
    if (!Array.isArray(debate.turns) || debate.turns.length !== 4) {
      return res.status(400).json({ error: 'Exactly 4 turns are required before finishing.' });
    }

    const turnsForJudge = debate.turns.map((turn) => {
      return {
        speaker: turn.speaker || (turn.role === 'speakerA' ? 'A' : 'B'),
        transcript: turn.transcript || '',
        metrics: turn.metrics || baselineMetrics(),
      };
    });

    const result = await judgeDebate({
      topic: debate.topicPrompt,
      turns: turnsForJudge,
    });

    debate.result = result;
    debate.currentPhase = 'completed';
    debate.endedAt = new Date();
    await debate.save();

    res.json({
      ok: true,
      debateId,
      result,
    });
  } catch (error) {
    next(error);
  }
}
