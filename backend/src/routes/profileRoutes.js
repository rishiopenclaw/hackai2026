import { Router } from 'express';
import {
  bootstrapDemoUser,
  clearProfileResume,
  createProfile,
  getProfile,
  parseResumePdfIntoProfile,
  parseResumeIntoProfile,
  updateProfile,
} from '../controllers/profileController.js';

const router = Router();

router.post('/', createProfile);
router.post('/demo/bootstrap', bootstrapDemoUser);
router.get('/:userId', getProfile);
router.patch('/:userId', updateProfile);
router.post('/:userId/parse-resume', parseResumeIntoProfile);
router.post('/:userId/parse-resume-pdf', parseResumePdfIntoProfile);
router.delete('/:userId/resume', clearProfileResume);

export default router;
