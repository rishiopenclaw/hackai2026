import mongoose from 'mongoose';
import dotenv from 'dotenv';
import bcrypt from 'bcryptjs';
import { User } from './src/models/User.js';

dotenv.config();

const seedDemoUser = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('✅ Connected to MongoDB for Seeding...');

    const email = 'demo@demo.com';

    // Delete existing demo user if it exists to allow re-running
    await User.deleteMany({ email });
    console.log('🗑️  Cleared old demo user (if any).');

    const salt = await bcrypt.genSalt(10);
    const passwordHash = await bcrypt.hash('demopass123', salt);

    const demoUser = await User.create({
      displayName: 'Demo User',
      email: email,
      passwordHash: passwordHash,
      xp: 4120, // Should be Orator rank
      level: 7, // Floor(0.1 * sqrt(4120)) + 1 = 7
      streakDays: 42,
      maxStreakDays: 89,
      loginCount: 154,
      lastLoginDate: new Date(),
      totalMinutesPracticed: 342,
      totalWordsSpoken: 9021,
      skillLevel: 'orator',
      stats: {
        vocabulary: 88,
        pacing: 72,
        fillerWords: 95,
        pronunciation: 81,
        confidence: 90
      },
      quests: {
        debatesWon: 1,
        minutesPracticedToday: 12,
        drillsCompleted: 0,
        lastQuestReset: new Date()
      }
    });

    console.log('🎉 Successfully created Demo Account!');
    console.log('--------------------------------------------------');
    console.log(`Email:    ${demoUser.email}`);
    console.log(`Password: demopass123`);
    console.log(`Rank:     ${demoUser.skillLevel.toUpperCase()} (Level ${demoUser.level})`);
    console.log(`Streak:   ${demoUser.streakDays} Days`);
    console.log('--------------------------------------------------');

    process.exit(0);
  } catch (error) {
    console.error('❌ Seeding Error:', error);
    process.exit(1);
  }
};

seedDemoUser();
