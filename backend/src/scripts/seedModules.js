import 'dotenv/config';
import { connectDB } from '../config/db.js';
import { SpeakingModule } from '../models/SpeakingModule.js';

const seed = [
  { title: 'Warmup Echo', subtitle: 'Articulation', type: 'articulation_drill', pathIndex: 0, status: 'completed', xpReward: 20, estimatedDurationSeconds: 30 },
  { title: 'Elevator Sparks', subtitle: 'Impromptu', type: 'elevator_pitch', pathIndex: 1, status: 'completed', xpReward: 30, estimatedDurationSeconds: 60 },
  { title: 'Sparring Partner', subtitle: 'AI Debate', type: 'ai_sparring', pathIndex: 2, status: 'available', xpReward: 40, estimatedDurationSeconds: 180 },
  { title: 'The Arena', subtitle: 'Live P2P', type: 'p2p_debate', pathIndex: 3, status: 'available', xpReward: 60, estimatedDurationSeconds: 240 },
  { title: 'Precision Drill', subtitle: 'Shadowing', type: 'articulation_drill', pathIndex: 4, status: 'locked', requiredXP: 1500, xpReward: 35, estimatedDurationSeconds: 30 },
];

async function run() {
  await connectDB(process.env.MONGODB_URI);
  await SpeakingModule.deleteMany({});
  await SpeakingModule.insertMany(seed);
  console.log('✅ Seeded speaking modules');
  process.exit(0);
}

run().catch((err) => {
  console.error(err);
  process.exit(1);
});
