import mongoose from 'mongoose';
import { PDFParse } from 'pdf-parse';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { User } from '../models/User.js';
import { analyzeResume } from '../services/gemini.js';

function mapResumeToUserFields(profile = {}) {
  const fields = {
    headlineRole: profile.role || '',
    industry: profile.industry || '',
    experience: Array.isArray(profile.experience) ? profile.experience : [],
    skills: Array.isArray(profile.skills) ? profile.skills : [],
    goals: Array.isArray(profile.goals) ? profile.goals : [],
    speakingStrengths: Array.isArray(profile.strengths) ? profile.strengths : [],
    speakingWeaknesses: Array.isArray(profile.weaknesses) ? profile.weaknesses : [],
  };
  const name = typeof profile.name === 'string' ? profile.name.trim() : '';
  if (name) fields.displayName = name;
  return fields;
}

function validateObjectId(id, label = 'id') {
  if (!mongoose.Types.ObjectId.isValid(id)) {
    const err = new Error(`Invalid ${label}.`);
    err.status = 400;
    throw err;
  }
}

function normalizeBase64Document(input) {
  if (typeof input !== 'string') return '';
  const value = input.trim();
  const commaIndex = value.indexOf(',');
  if (value.startsWith('data:') && commaIndex !== -1) {
    return value.slice(commaIndex + 1);
  }
  return value;
}

function generateToken(id) {
  return jwt.sign({ id }, process.env.JWT_SECRET || 'speakarena_secret_2026', {
    expiresIn: '30d',
  });
}

async function upsertProfileFromResumeText({ userId, resumeText }) {
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
  if (!user) return null;
  return { profile, user };
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

    const data = await upsertProfileFromResumeText({ userId, resumeText });
    if (!data) return res.status(404).json({ error: 'User not found.' });

    res.json({
      ok: true,
      profile: data.profile,
      user: data.user,
    });
  } catch (error) {
    next(error);
  }
}

export async function parseResumePdfIntoProfile(req, res, next) {
  try {
    const { userId } = req.params;
    const { resumePdfBase64, fileName } = req.body || {};
    validateObjectId(userId, 'userId');

    if (!resumePdfBase64 || typeof resumePdfBase64 !== 'string') {
      return res.status(400).json({ error: 'resumePdfBase64 is required.' });
    }

    const normalizedBase64 = normalizeBase64Document(resumePdfBase64);
    let pdfBuffer;
    try {
      pdfBuffer = Buffer.from(normalizedBase64, 'base64');
    } catch {
      return res.status(400).json({ error: 'Invalid base64 payload.' });
    }
    if (!pdfBuffer || pdfBuffer.length < 16) {
      return res.status(400).json({ error: 'Invalid PDF payload.' });
    }

    let extractedText = '';
    let parser;
    try {
      parser = new PDFParse({ data: pdfBuffer });
      const parsed = await parser.getText();
      extractedText = (parsed?.text || '').trim();
    } catch {
      return res.status(400).json({ error: 'Unable to parse PDF. Ensure the file is a valid text-based PDF.' });
    } finally {
      if (parser) {
        await parser.destroy().catch(() => {});
      }
    }
    if (!extractedText) {
      return res.status(400).json({ error: 'No readable text found in PDF.' });
    }

    const data = await upsertProfileFromResumeText({ userId, resumeText: extractedText });
    if (!data) return res.status(404).json({ error: 'User not found.' });

    res.json({
      ok: true,
      fileName: fileName || null,
      extractedTextLength: extractedText.length,
      profile: data.profile,
      user: data.user,
    });
  } catch (error) {
    next(error);
  }
}

export async function clearProfileResume(req, res, next) {
  try {
    const { userId } = req.params;
    validateObjectId(userId, 'userId');

    const user = await User.findByIdAndUpdate(
      userId,
      {
        $set: {
          resumeRawText: '',
          headlineRole: '',
          industry: '',
          experience: [],
          skills: [],
          goals: [],
          speakingStrengths: [],
          speakingWeaknesses: [],
        },
      },
      { new: true, runValidators: true }
    );
    if (!user) return res.status(404).json({ error: 'User not found.' });

    res.json({ ok: true, user });
  } catch (error) {
    next(error);
  }
}

export async function bootstrapDemoUser(req, res, next) {
  try {
    const { displayName, email } = req.body || {};
    const normalizedEmail = (typeof email === 'string' ? email.trim().toLowerCase() : '') || 'demo@vocalyze.app';
    const safeDisplayName = (typeof displayName === 'string' ? displayName.trim() : '') || 'Guest User';

    let user = await User.findOne({ email: normalizedEmail });
    if (!user) {
      const passwordHash = await bcrypt.hash('demo-password', 10);
      user = await User.create({
        displayName: safeDisplayName,
        email: normalizedEmail,
        passwordHash,
        streakDays: 3,
        maxStreakDays: 7,
        loginCount: 19,
        xp: 50,
        level: 1,
      });
    } else {
      let needsSave = false;
      const isGuestName = !user.displayName || user.displayName.trim() === 'Guest User';
      if (safeDisplayName && isGuestName && user.displayName !== safeDisplayName) {
        user.displayName = safeDisplayName;
        needsSave = true;
      }
      if (user.streakDays === 0 && user.xp === 0) {
        user.streakDays = 3;
        user.maxStreakDays = 7;
        user.loginCount = 19;
        user.xp = 50;
        needsSave = true;
      }
      if (needsSave) await user.save();
    }

    return res.json({
      ok: true,
      user: {
        _id: user._id,
        displayName: user.displayName,
        email: user.email,
        skillLevel: user.skillLevel,
        xp: user.xp,
        level: user.level,
        streakDays: user.streakDays,
        maxStreakDays: user.maxStreakDays,
        loginCount: user.loginCount,
      },
      token: generateToken(user._id),
    });
  } catch (error) {
    next(error);
  }
}
