import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';
import moduleRoutes from './routes/moduleRoutes.js';
import profileRoutes from './routes/profileRoutes.js';
import debateRoutes from './routes/debateRoutes.js';
import geminiRoutes from './routes/gemini.js';
import { errorHandler } from './middleware/errorHandler.js';

const app = express();

app.use(helmet());
app.use(cors());
app.use(express.json({ limit: '50mb' }));
app.use(morgan('dev'));

app.get('/health', (req, res) => res.json({ ok: true, service: 'speakarena-backend' }));
app.use('/api/modules', moduleRoutes);
app.use('/api/profiles', profileRoutes);
app.use('/api/debates', debateRoutes);
app.use('/api/gemini', geminiRoutes);

app.use(errorHandler);

export default app;
