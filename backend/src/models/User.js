import mongoose from 'mongoose';

const userSchema = new mongoose.Schema(
  {
    displayName: { type: String, required: true, trim: true },
    email: { type: String, trim: true, lowercase: true, unique: true, sparse: true },
    headlineRole: { type: String, default: '' },
    industry: { type: String, default: '' },
    experience: { type: [String], default: [] },
    skills: { type: [String], default: [] },
    goals: { type: [String], default: [] },
    speakingStrengths: { type: [String], default: [] },
    speakingWeaknesses: { type: [String], default: [] },
    skillScores: {
      structure: { type: Number, default: 50, min: 0, max: 100 },
      confidence: { type: Number, default: 50, min: 0, max: 100 },
      grammar: { type: Number, default: 50, min: 0, max: 100 },
      tonality: { type: Number, default: 50, min: 0, max: 100 },
      argumentation: { type: Number, default: 50, min: 0, max: 100 },
    },
    eloRating: { type: Number, default: 1000 },
    resumeRawText: { type: String, default: '' },
    xp: { type: Number, default: 0 },
    level: { type: Number, default: 1 },
    streakDays: { type: Number, default: 0 },
    hearts: { type: Number, default: 5 },
    maxHearts: { type: Number, default: 5 },
    skillLevel: {
      type: String,
      enum: ['rookie', 'challenger', 'contender', 'orator', 'master'],
      default: 'rookie',
    },
  },
  { timestamps: true }
);

export const User = mongoose.model('User', userSchema);
