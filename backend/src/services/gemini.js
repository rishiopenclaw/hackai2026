import { GoogleGenerativeAI } from "@google/generative-ai";
import { config } from "../config/env.js";

const genAI = new GoogleGenerativeAI(config.geminiApiKey);
const textModel = genAI.getGenerativeModel({ model: "gemini-2.5-flash" });
const audioModel = genAI.getGenerativeModel({ model: "gemini-2.5-flash" });

function stripMarkdownFences(rawText) {
  const text = rawText.trim();
  if (!text.startsWith("```")) return text;
  return text.replace(/^```(?:json)?\s*/i, "").replace(/\s*```$/, "").trim();
}

function extractLikelyJSON(rawText) {
  const text = stripMarkdownFences(rawText);
  const objectStart = text.indexOf("{");
  const objectEnd = text.lastIndexOf("}");
  if (objectStart !== -1 && objectEnd !== -1 && objectEnd > objectStart) {
    return text.slice(objectStart, objectEnd + 1);
  }
  const arrayStart = text.indexOf("[");
  const arrayEnd = text.lastIndexOf("]");
  if (arrayStart !== -1 && arrayEnd !== -1 && arrayEnd > arrayStart) {
    return text.slice(arrayStart, arrayEnd + 1);
  }
  return text;
}

function isNumber(v) {
  return typeof v === "number" && Number.isFinite(v);
}

function isStringArray(v) {
  return Array.isArray(v) && v.every((item) => typeof item === "string");
}

function isObject(v) {
  return v !== null && typeof v === "object" && !Array.isArray(v);
}

function validateResumeProfile(data) {
  return (
    isObject(data) &&
    typeof data.role === "string" &&
    isStringArray(data.experience) &&
    isStringArray(data.skills) &&
    isStringArray(data.goals) &&
    typeof data.industry === "string" &&
    isStringArray(data.strengths) &&
    isStringArray(data.weaknesses) &&
    (data.name === undefined || typeof data.name === "string")
  );
}

function validateSpeechMetrics(data) {
  return (
    isObject(data) &&
    typeof data.transcript === "string" &&
    isNumber(data.filler_count) &&
    isStringArray(data.filler_words) &&
    isNumber(data.wpm) &&
    isNumber(data.pause_count) &&
    isNumber(data.avg_pause_duration) &&
    isNumber(data.tonality_score) &&
    isNumber(data.grammar_score) &&
    isNumber(data.structure_score) &&
    isNumber(data.argument_strength) &&
    isNumber(data.confidence_score) &&
    isNumber(data.overall_score) &&
    typeof data.top_strength === "string" &&
    typeof data.top_weakness === "string" &&
    typeof data.one_line_feedback === "string"
  );
}

function validateDebateResult(data) {
  return (
    isObject(data) &&
    isNumber(data.score_a) &&
    isNumber(data.score_b) &&
    ["A", "B", "tie"].includes(data.winner) &&
    typeof data.reasoning === "string" &&
    typeof data.feedback_a === "string" &&
    typeof data.feedback_b === "string"
  );
}

function validateQuestion(data) {
  return (
    isObject(data) &&
    typeof data.prompt === "string" &&
    typeof data.instructions === "string" &&
    typeof data.why_this === "string"
  );
}

function validateRecommendations(data) {
  return (
    isObject(data) &&
    Array.isArray(data.recommendations) &&
    data.recommendations.length === 3 &&
    data.recommendations.every(
      (r) =>
        isObject(r) &&
        typeof r.title === "string" &&
        typeof r.description === "string" &&
        typeof r.reason === "string"
    ) &&
    ["improving", "plateau", "declining"].includes(data.overall_trend) &&
    typeof data.trend_note === "string"
  );
}

// ─── HELPER: call Gemini and parse JSON response ───
async function callGeminiJSON({
  prompt,
  audioPart = null,
  validator = null,
  modelType = "text",
  retries = 1,
}) {
  const model = modelType === "audio" ? audioModel : textModel;
  const parts = [{ text: prompt }];
  if (audioPart) parts.push(audioPart);

  let lastError = null;
  for (let attempt = 0; attempt <= retries; attempt += 1) {
    try {
      const result = await model.generateContent({
        contents: [{ role: "user", parts }],
        generationConfig: { responseMimeType: "application/json" },
      });
      const text = result.response.text();
      const normalized = extractLikelyJSON(text);
      const parsed = JSON.parse(normalized);

      if (validator && !validator(parsed)) {
        throw new Error("Response JSON shape validation failed");
      }

      return parsed;
    } catch (err) {
      lastError = err;
      if (attempt === retries) break;
    }
  }

  const message = lastError?.message || "Unknown model response error";
  throw new Error(`Failed to parse Gemini response: ${message}`);
}

// ─── 1. RESUME → PROFILE ───
export async function analyzeResume(resumeText) {
  const prompt = `
You are building a user profile for an interview and public speaking coach app.
Analyze this resume and extract a structured profile.

Return STRICT JSON:
{
  "name": "string - full name of the person (from header/contact)",
  "role": "string - their current role or target role",
  "experience": ["string - each major experience"],
  "skills": ["string - key skills"],
  "goals": ["string - likely career goals based on resume"],
  "industry": "string",
  "strengths": ["string - likely speaking/interview strengths"],
  "weaknesses": ["string - likely speaking/interview weaknesses"]
}

Resume:
${resumeText}

Output ONLY a valid JSON object. Do not include markdown, code fences, or commentary.
  `;
  return callGeminiJSON({
    prompt,
    validator: validateResumeProfile,
    modelType: "text",
    retries: 1,
  });
}

// ─── 2. SPEECH ANALYSIS (audio → metrics) ───
export async function analyzeSpeech({ audioBase64, mimeType, transcriptText, context }) {
  // context = { topic, speaker, exerciseType }
  const transcriptHint =
    transcriptText && typeof transcriptText === "string"
      ? `Speaker text input:\n"${transcriptText.trim()}"`
      : "";
  const prompt = `
You are an expert speech and communication coach.
Analyze this speaking sample.

Context: ${context.exerciseType || "general"} exercise.
${context.topic ? `Topic: "${context.topic}"` : ""}
${context.speaker ? `Speaker: Player ${context.speaker}` : ""}
${audioBase64 ? "Input type: audio" : "Input type: text transcript"}
${transcriptHint}

Analyze the speaker's delivery in detail. Listen carefully for:
- Filler words (um, uh, like, you know, so, basically, right, actually)
- Speaking pace
- Pauses (both strategic and awkward)
- Vocal tone and energy variation
- Grammar and sentence structure
- Confidence level based on voice patterns
- Argument quality (if debating)

Return STRICT JSON:
{
  "transcript": "string - full transcription of what was said",
  "filler_count": number,
  "filler_words": ["each filler word detected"],
  "wpm": number,
  "pause_count": number,
  "avg_pause_duration": number,
  "tonality_score": number 0-100,
  "grammar_score": number 0-100,
  "structure_score": number 0-100,
  "argument_strength": number 0-100,
  "confidence_score": number 0-100,
  "overall_score": number 0-100,
  "top_strength": "string - one specific thing they did well",
  "top_weakness": "string - one specific thing to improve",
  "one_line_feedback": "string - brief coaching note"
}

Output ONLY a valid JSON object. Do not include markdown, code fences, or commentary.
  `;
  let normalizedAudio = audioBase64 || "";
  if (normalizedAudio.startsWith("data:") && normalizedAudio.includes(",")) {
    normalizedAudio = normalizedAudio.slice(normalizedAudio.indexOf(",") + 1);
  }

  const audioPart = normalizedAudio
    ? {
        inlineData: {
          mimeType: mimeType || "audio/mp4",
          data: normalizedAudio,
        },
      }
    : null;

  const metrics = await callGeminiJSON({
    prompt,
    audioPart,
    validator: validateSpeechMetrics,
    modelType: audioBase64 ? "audio" : "text",
    retries: 1,
  });

  const transcript = (metrics.transcript || "").toLowerCase();
  const unsupportedMarkers = [
    "cannot process audio",
    "cannot analyze audio",
    "audio analysis is not supported",
    "unable to process audio",
    "cannot listen",
  ];
  if (unsupportedMarkers.some((marker) => transcript.includes(marker))) {
    throw new Error("Gemini returned unsupported-audio response for speech analysis");
  }

  return metrics;
}

// ─── 3. DEBATE JUDGE ───
export async function judgeDebate({ topic, turns }) {
  const turnsText = turns
    .map(
      (t, i) => `
Turn ${i + 1}, Speaker ${t.speaker}:
Transcript: "${t.transcript}"
Metrics: ${JSON.stringify({
        filler_count: t.metrics.filler_count,
        wpm: t.metrics.wpm,
        tonality: t.metrics.tonality_score,
        grammar: t.metrics.grammar_score,
        structure: t.metrics.structure_score,
        argument: t.metrics.argument_strength,
        confidence: t.metrics.confidence_score,
      })}`
    )
    .join("\n");

  const prompt = `
Topic: "${topic}"

Debate turns:
${turnsText}

You are an expert debate judge. Evaluate BOTH the quality of arguments
AND the quality of delivery. Consider:
- Persuasiveness and relevance of arguments
- Use of evidence or reasoning
- Clarity and structure
- Delivery: pace, tone, confidence, filler words
- Improvement or consistency across turns

Return STRICT JSON:
{
  "score_a": number 0-100,
  "score_b": number 0-100,
  "winner": "A" or "B" or "tie",
  "reasoning": "string - brief explanation of why the winner won",
  "feedback_a": "string - specific feedback for Player A",
  "feedback_b": "string - specific feedback for Player B"
}

Output ONLY a valid JSON object. Do not include markdown, code fences, or commentary.
  `;

  return callGeminiJSON({
    prompt,
    validator: validateDebateResult,
    modelType: "text",
    retries: 1,
  });
}

// ─── 4. GENERATE PRACTICE QUESTION ───
export async function generateQuestion({ profile, weakAreas, exerciseType }) {
  const prompt = `
You are an interview and public speaking coach.

User profile:
${JSON.stringify(profile)}

Their recent weak areas: ${JSON.stringify(weakAreas)}

Exercise type: "${exerciseType}"
- "behavioral": STAR-format behavioral interview question relevant to their experience
- "impromptu": random topic to speak about for 2 minutes
- "elevator": practice their elevator pitch for a specific audience
- "debate": a debatable topic with two clear sides

Return STRICT JSON:
{
  "prompt": "string - the question or topic",
  "instructions": "string - brief instructions for the speaker",
  "why_this": "string - why this targets their weak area"
}

Output ONLY a valid JSON object. Do not include markdown, code fences, or commentary.
  `;

  return callGeminiJSON({
    prompt,
    validator: validateQuestion,
    modelType: "text",
    retries: 1,
  });
}

// ─── 5. RECOMMENDATIONS ───
export async function getRecommendations({ profile, recentSessions }) {
  const sessionsData = recentSessions.slice(0, 10).map((s) => ({
    date: s.created_at,
    type: s.type,
    exercise: s.exercise,
    overall: s.metrics?.overall_score,
    weakness: s.metrics?.top_weakness,
    filler_count: s.metrics?.filler_count,
    wpm: s.metrics?.wpm,
  }));

  const prompt = `
You are an AI speaking coach reviewing a learner's progress.

User profile: ${JSON.stringify(profile)}

Recent sessions (newest first):
${JSON.stringify(sessionsData)}

Give exactly 3 specific, actionable recommendations.
Each must reference their actual data.

Return STRICT JSON:
{
  "recommendations": [
    {
      "title": "string - short title",
      "description": "string - what to do",
      "reason": "string - why, referencing their data"
    }
  ],
  "overall_trend": "improving" or "plateau" or "declining",
  "trend_note": "string - one sentence about their trajectory"
}

Output ONLY a valid JSON object. Do not include markdown, code fences, or commentary.
  `;

  return callGeminiJSON({
    prompt,
    validator: validateRecommendations,
    modelType: "text",
    retries: 2,
  });
}
