import mongoose from 'mongoose';

const speakingModuleSchema = new mongoose.Schema(
  {
    title: { type: String, required: true, trim: true },
    subtitle: { type: String, required: true, trim: true },
    type: {
      type: String,
      enum: ['p2p_debate', 'ai_sparring', 'elevator_pitch', 'articulation_drill'],
      required: true,
    },
    pathIndex: { type: Number, required: true, index: true },
    branch: { type: Number, default: 0 },
    status: { type: String, enum: ['locked', 'available', 'completed'], default: 'locked' },
    requiredXP: { type: Number, default: 0 },
    xpReward: { type: Number, required: true },
    heartCost: { type: Number, default: 1 },
    recommendedSkill: {
      type: String,
      enum: ['rookie', 'challenger', 'contender', 'orator', 'master'],
      default: 'rookie',
    },
    estimatedDurationSeconds: { type: Number, required: true },
    prerequisiteModuleId: { type: mongoose.Schema.Types.ObjectId, ref: 'SpeakingModule', default: null },
  },
  { timestamps: true }
);

speakingModuleSchema.index({ title: 1, type: 1 }, { unique: true });

export const SpeakingModule = mongoose.model('SpeakingModule', speakingModuleSchema);
