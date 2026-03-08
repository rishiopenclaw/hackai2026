import mongoose from 'mongoose';

export async function connectDB(uri, dbName) {
  if (!uri) throw new Error('MONGODB_URI is required');
  mongoose.set('strictQuery', true);
  await mongoose.connect(uri, {
    serverSelectionTimeoutMS: 10000,
    ...(dbName ? { dbName } : {}),
  });
  console.log('✅ MongoDB connected');
}
