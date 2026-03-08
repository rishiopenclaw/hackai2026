import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';
import moduleRoutes from './routes/moduleRoutes.js';
import { errorHandler } from './middleware/errorHandler.js';

const app = express();

app.use(helmet());
app.use(cors());
app.use(express.json({ limit: '1mb' }));
app.use(morgan('dev'));

app.get('/health', (req, res) => res.json({ ok: true, service: 'speakarena-backend' }));
app.use('/api/modules', moduleRoutes);

app.use(errorHandler);

export default app;
