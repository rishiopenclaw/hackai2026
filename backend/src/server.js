import app from './app.js';
import { connectDB } from './config/db.js';
import { config } from './config/env.js';

const PORT = config.port;

async function bootstrap() {
  await connectDB(config.mongoUri, config.dbName);
  app.listen(PORT, () => {
    console.log(`🚀 API listening on http://localhost:${PORT}`);
  });
}

bootstrap().catch((err) => {
  console.error('Failed to start server:', err);
  process.exit(1);
});
