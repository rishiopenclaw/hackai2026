import mongoose from 'mongoose';

const userSchema = new mongoose.Schema(
  {
    displayName: { type: String, required: true, trim: true },
    email: { type: String, trim: true, lowercase: true, unique: true, sparse: true },
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
