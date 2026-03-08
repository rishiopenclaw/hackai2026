import { Router } from "express";
import {
  analyzeResume,
  analyzeSpeech,
  judgeDebate,
  generateQuestion,
  getRecommendations,
} from "../services/gemini.js";

const router = Router();

router.post("/speech", async (req, res, next) => {
  try {
    const { audioBase64, mimeType, transcriptText, topic, speaker, exerciseType } = req.body;
    if (!audioBase64 && !transcriptText) {
      return res.status(400).json({ error: "audioBase64 or transcriptText is required." });
    }
    const metrics = await analyzeSpeech({
      audioBase64,
      mimeType,
      transcriptText,
      context: { topic, speaker, exerciseType },
    });
    res.json({ ok: true, metrics });
  } catch (e) {
    next(e);
  }
});

router.post("/question", async (req, res, next) => {
  try {
    const { profile, weakAreas, exerciseType } = req.body;
    const question = await generateQuestion({ profile, weakAreas, exerciseType });
    res.json({ ok: true, question });
  } catch (e) {
    next(e);
  }
});

// Test: resume analysis
router.post("/test/resume", async (req, res, next) => {
  try {
    const { resumeText } = req.body;
    if (!resumeText) return res.status(400).json({ error: "resumeText is required." });
    const profile = await analyzeResume(resumeText);
    res.json({ ok: true, profile });
  } catch (e) {
    next(e);
  }
});

// Test: speech analysis (send base64 audio)
router.post("/test/speech", async (req, res, next) => {
  try {
    const { audioBase64, mimeType, topic, speaker, exerciseType } = req.body;
    if (!audioBase64) return res.status(400).json({ error: "audioBase64 is required." });
    const metrics = await analyzeSpeech({
      audioBase64,
      mimeType,
      context: { topic, speaker, exerciseType },
    });
    res.json({ ok: true, metrics });
  } catch (e) {
    next(e);
  }
});

// Test: generate question
router.post("/test/question", async (req, res, next) => {
  try {
    const { profile, weakAreas, exerciseType } = req.body;
    const question = await generateQuestion({ profile, weakAreas, exerciseType });
    res.json({ ok: true, question });
  } catch (e) {
    next(e);
  }
});

// Test: judge debate from transcripts + metrics
router.post("/test/judge", async (req, res, next) => {
  try {
    const { topic, turns } = req.body;
    if (!topic || !Array.isArray(turns)) {
      return res.status(400).json({ error: "topic and turns[] are required." });
    }
    const result = await judgeDebate({ topic, turns });
    res.json({ ok: true, result });
  } catch (e) {
    next(e);
  }
});

// Test: recommendations from profile + recent sessions
router.post("/test/recommendations", async (req, res, next) => {
  try {
    const { profile, recentSessions = [] } = req.body;
    if (!profile) return res.status(400).json({ error: "profile is required." });
    const recommendations = await getRecommendations({ profile, recentSessions });
    res.json({ ok: true, recommendations });
  } catch (e) {
    next(e);
  }
});

export default router;
