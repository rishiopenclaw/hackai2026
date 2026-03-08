import mongoose from 'mongoose';
import { User } from '../models/User.js';
import { analyzeResume } from '../services/gemini.js';

function mapResumeToUserFields(profile = {}) {
  return {
    headlineRole: profile.role || '',
    industry: profile.industry || '',
    experience: Array.isArray(profile.experience) ? profile.experience : [],
    skills: Array.isArray(profile.skills) ? profile.skills : [],
    goals: Array.isArray(profile.goals) ? profile.goals : [],
    speakingStrengths: Array.isArray(profile.strengths) ? profile.strengths : [],
    speakingWeaknesses: Array.isArray(profile.weaknesses) ? profile.weaknesses : [],
  };
}

function validateObjectId(id, label = 'id') {
  if (!mongoose.Types.ObjectId.isValid(id)) {
    const err = new Error(`Invalid ${label}.`);
    err.status = 400;
    throw err;
  }
}

export async function createProfile(req, res, next) {
  try {
    const { displayName, email, resumeText = '' } = req.body || {};
    if (!displayName || typeof displayName !== 'string') {
      return res.status(400).json({ error: 'displayName is required.' });
    }

    let resumeProfile = null;
    if (resumeText && typeof resumeText === 'string') {
      resumeProfile = await analyzeResume(resumeText);
    }

    const user = await User.create({
      displayName: displayName.trim(),
      email: email || undefined,
      resumeRawText: resumeText || '',
      ...(resumeProfile ? mapResumeToUserFields(resumeProfile) : {}),
    });

    res.status(201).json({
      ok: true,
      user,
    });
  } catch (error) {
    next(error);
  }
}

export async function getProfile(req, res, next) {
  try {
    const { userId } = req.params;
    validateObjectId(userId, 'userId');

    const user = await User.findById(userId);
    if (!user) return res.status(404).json({ error: 'User not found.' });

    res.json({ ok: true, user });
  } catch (error) {
    next(error);
  }
}

export async function updateProfile(req, res, next) {
  try {
    const { userId } = req.params;
    validateObjectId(userId, 'userId');

    const updatable = [
      'displayName',
      'email',
      'headlineRole',
      'industry',
      'experience',
      'skills',
      'goals',
      'speakingStrengths',
      'speakingWeaknesses',
      'skillScores',
      'eloRating',
      'xp',
      'level',
      'streakDays',
      'hearts',
      'maxHearts',
      'skillLevel',
    ];

    const payload = Object.fromEntries(
      Object.entries(req.body || {}).filter(([key]) => updatable.includes(key))
    );

    const user = await User.findByIdAndUpdate(userId, { $set: payload }, { new: true, runValidators: true });
    if (!user) return res.status(404).json({ error: 'User not found.' });

    res.json({ ok: true, user });
  } catch (error) {
    next(error);
  }
}

export async function parseResumeIntoProfile(req, res, next) {
  try {
    const { userId } = req.params;
    const { resumeText } = req.body || {};
    validateObjectId(userId, 'userId');

    if (!resumeText || typeof resumeText !== 'string') {
      return res.status(400).json({ error: 'resumeText is required.' });
    }

    const profile = await analyzeResume(resumeText);
    const user = await User.findByIdAndUpdate(
      userId,
      {
        $set: {
          resumeRawText: resumeText,
          ...mapResumeToUserFields(profile),
        },
      },
      { new: true, runValidators: true }
    );
    if (!user) return res.status(404).json({ error: 'User not found.' });

    res.json({
      ok: true,
      profile,
      user,
    });
  } catch (error) {
    next(error);
  }
}
