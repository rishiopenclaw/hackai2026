import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';

const userSchema = new mongoose.Schema(
  {
    displayName: { type: String, required: true, trim: true },
    email: { type: String, trim: true, lowercase: true, unique: true, sparse: true },
    passwordHash: { type: String, required: true },
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
    maxStreakDays: { type: Number, default: 0 },
    loginCount: { type: Number, default: 0 },
    lastLoginDate: { type: Date },
    totalMinutesPracticed: { type: Number, default: 0 },
    totalWordsSpoken: { type: Number, default: 0 },
    stats: {
      vocabulary: { type: Number, default: 50 },
      pacing: { type: Number, default: 50 },
      fillerWords: { type: Number, default: 50 },
      pronunciation: { type: Number, default: 50 },
      confidence: { type: Number, default: 50 }
    },
    quests: {
      debatesWon: { type: Number, default: 0 },
      minutesPracticedToday: { type: Number, default: 0 },
      drillsCompleted: { type: Number, default: 0 },
      lastQuestReset: { type: Date }
    },
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

userSchema.methods.addXP = async function (amount) {
  this.xp += amount;

  // Numerical Level Curve
  this.level = Math.floor(0.1 * Math.sqrt(this.xp)) + 1;

  // Categorical Rank Scale
  if (this.xp >= 5001) this.skillLevel = 'master';
  else if (this.xp >= 3001) this.skillLevel = 'orator';
  else if (this.xp >= 1501) this.skillLevel = 'contender';
  else if (this.xp >= 501) this.skillLevel = 'challenger';
  else this.skillLevel = 'rookie';

  return this.save();
};

userSchema.methods.comparePassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.passwordHash);
};

export const User = mongoose.model('User', userSchema);
