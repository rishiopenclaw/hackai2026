import { Router } from 'express';
import { finishDebate, startDebate, submitDebateTurn } from '../controllers/debateController.js';

const router = Router();

router.post('/start', startDebate);
router.post('/turn', submitDebateTurn);
router.post('/finish', finishDebate);

export default router;
