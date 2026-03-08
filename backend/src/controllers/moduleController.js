import { SpeakingModule } from '../models/SpeakingModule.js';

export async function listModules(req, res, next) {
  try {
    const modules = await SpeakingModule.find().sort({ pathIndex: 1, branch: 1 });
    res.json({ data: modules });
  } catch (err) {
    next(err);
  }
}

export async function importModules(req, res, next) {
  try {
    const { modules } = req.body;
    if (!Array.isArray(modules) || modules.length === 0) {
      return res.status(400).json({ error: 'modules[] is required' });
    }

    const ops = modules.map((m) => ({
      updateOne: {
        filter: { title: m.title, type: m.type },
        update: { $set: m },
        upsert: true,
      },
    }));

    const result = await SpeakingModule.bulkWrite(ops);
    res.status(201).json({
      message: 'Modules imported',
      inserted: result.upsertedCount,
      modified: result.modifiedCount,
      matched: result.matchedCount,
    });
  } catch (err) {
    next(err);
  }
}
