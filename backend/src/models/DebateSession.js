import mongoose from 'mongoose';

const debateTurnSchema = new mongoose.Schema(
  {
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
    startedAt: Date,
    endedAt: Date,
  },
  { timestamps: true }
);

export const DebateSession = mongoose.model('DebateSession', debateSessionSchema);
