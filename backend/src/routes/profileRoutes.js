import { Router } from 'express';
import {
  createProfile,
  getProfile,
  parseResumeIntoProfile,
  updateProfile,
} from '../controllers/profileController.js';

const router = Router();

router.post('/', createProfile);
router.get('/:userId', getProfile);
router.patch('/:userId', updateProfile);
router.post('/:userId/parse-resume', parseResumeIntoProfile);

export default router;
