import { MongoClient } from 'mongodb';

// Load environment variables (ensure you have MONGODB_URI in .env)
const uri = process.env.MONGODB_URI || '';
if (!uri) {
  console.error('❗️ MONGODB_URI is not set in .env');
  process.exit(1);
}

const client = new MongoClient(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

let db = null;

export async function connect() {
  if (!db) {
    try {
      await client.connect();
      // Default database name can be extracted from the URI or set via env var
      const dbName = process.env.MONGODB_DB_NAME || client.db().databaseName;
      db = client.db(dbName);
      console.log('✅ Connected to MongoDB');
    } catch (err) {
      console.error('❌ MongoDB connection error:', err);
      throw err;
    }
  }
  return db;
}

export function getDb() {
  if (!db) {
    throw new Error('Database not connected. Call connect() first.');
  }
  return db;
}

export async function close() {
  await client.close();
  db = null;
  console.log('🔌 MongoDB connection closed');
}
