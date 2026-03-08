import { Router } from 'express';
import { register, login, getMe, getLeaderboard } from '../controllers/authController.js';
import { protect } from '../middleware/authMiddleware.js';

const router = Router();

router.post('/register', register);
router.post('/login', login);
router.get('/me', protect, getMe);
router.get('/leaderboard', protect, getLeaderboard);

export default router;
