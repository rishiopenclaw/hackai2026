import { User } from '../models/User.js';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';

const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET || 'speakarena_secret_2026', {
    expiresIn: '30d',
  });
};

export const register = async (req, res) => {
  try {
    const { displayName, email, password } = req.body;

    if (!displayName || !email || !password) {
      return res.status(400).json({ error: 'Please provide all fields' });
    }

    const userExists = await User.findOne({ email });

    if (userExists) {
      return res.status(400).json({ error: 'User already exists' });
    }

    const salt = await bcrypt.genSalt(10);
    const passwordHash = await bcrypt.hash(password, salt);

    const user = await User.create({
      displayName,
      email,
      passwordHash,
    });

    if (user) {
      res.status(201).json({
        _id: user._id,
        displayName: user.displayName,
        email: user.email,
        token: generateToken(user._id),
      });
    } else {
      res.status(400).json({ error: 'Invalid user data' });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });

    if (user && (await user.comparePassword(password))) {
      // Streak Calculation Logic
      const now = new Date();
      let newStreak = user.streakDays || 0;
      let newMaxStreak = user.maxStreakDays || 0;

      if (user.lastLoginDate) {
        const lastLogin = new Date(user.lastLoginDate);
        const timeDiff = now.getTime() - lastLogin.getTime();
        const daysDiff = Math.floor(timeDiff / (1000 * 3600 * 24));

        if (daysDiff === 1) {
          // Logged in exactly yesterday
          newStreak += 1;
        } else if (daysDiff > 1) {
          // Missed a day
          newStreak = 1;
        }
        // If daysDiff === 0 (same day), streak stays the same
      } else {
        // First login ever
        newStreak = 1;
      }

      if (newStreak > newMaxStreak) {
        newMaxStreak = newStreak;
      }

      // Update User Document
      user.streakDays = newStreak;
      user.maxStreakDays = newMaxStreak;
      user.loginCount = (user.loginCount || 0) + 1;
      user.lastLoginDate = now;
      await user.save();

      res.json({
        _id: user._id,
        displayName: user.displayName,
        email: user.email,
        streakDays: user.streakDays,
        maxStreakDays: user.maxStreakDays,
        loginCount: user.loginCount,
        skillLevel: user.skillLevel,
        xp: user.xp,
        token: generateToken(user._id),
      });
    } else {
      res.status(401).json({ error: 'Invalid email or password' });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const getMe = async (req, res) => {
  try {
    const user = await User.findById(req.user._id).select('-passwordHash');
    if (user) {
      res.json(user);
    } else {
      res.status(404).json({ error: 'User not found' });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const getLeaderboard = async (req, res) => {
  try {
    const user = await User.findById(req.user._id);
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    const leaderboard = await User.find({ skillLevel: user.skillLevel })
      .select('displayName xp level')
      .sort({ xp: -1 })
      .limit(10);

    res.json(leaderboard);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
