import mongoose from 'mongoose';

const debateMetricsSchema = new mongoose.Schema(
  {
    transcript: { type: String, default: '' },
    filler_count: { type: Number, default: 0 },
    filler_words: { type: [String], default: [] },
    wpm: { type: Number, default: 0 },
    pause_count: { type: Number, default: 0 },
    avg_pause_duration: { type: Number, default: 0 },
    tonality_score: { type: Number, default: 0 },
    grammar_score: { type: Number, default: 0 },
    structure_score: { type: Number, default: 0 },
    argument_strength: { type: Number, default: 0 },
    confidence_score: { type: Number, default: 0 },
    overall_score: { type: Number, default: 0 },
    top_strength: { type: String, default: '' },
    top_weakness: { type: String, default: '' },
    one_line_feedback: { type: String, default: '' },
  },
  { _id: false }
);

const debateTurnSchema = new mongoose.Schema(
  {
    speaker: { type: String, enum: ['A', 'B'], required: true },
    turnIndex: { type: Number, required: true, min: 0 },
    mimeType: { type: String, default: 'audio/webm' },
    metrics: { type: debateMetricsSchema, default: () => ({}) },
    role: { type: String, enum: ['speakerA', 'speakerB', 'aiOpponent'], required: true },
    phase: {
      type: String,
      enum: ['waiting', 'openingA', 'openingB', 'rebuttalA', 'rebuttalB', 'analysis', 'completed'],
      required: true,
    },
    allocatedSeconds: { type: Number, required: true },
    startedAt: Date,
    endedAt: Date,
    transcript: { type: String, default: '' },
  },
  { _id: true }
);

const debateResultSchema = new mongoose.Schema(
  {
    score_a: { type: Number, min: 0, max: 100 },
    score_b: { type: Number, min: 0, max: 100 },
    winner: { type: String, enum: ['A', 'B', 'tie'] },
    reasoning: { type: String, default: '' },
    feedback_a: { type: String, default: '' },
    feedback_b: { type: String, default: '' },
  },
  { _id: false }
);

const debateSessionSchema = new mongoose.Schema(
  {
    mode: { type: String, enum: ['p2p', 'ai'], required: true },
    topicPrompt: { type: String, required: true },
    speakerAUserId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    speakerBUserId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', default: null },
    aiOpponentName: { type: String, default: null },
    currentPhase: {
      type: String,
      enum: ['waiting', 'openingA', 'openingB', 'rebuttalA', 'rebuttalB', 'analysis', 'completed'],
      default: 'waiting',
    },
    turns: [debateTurnSchema],
    result: { type: debateResultSchema, default: null },
    startedAt: Date,
    endedAt: Date,
  },
  { timestamps: true }
);

export const DebateSession = mongoose.model('DebateSession', debateSessionSchema);
