import { Router } from 'express';
import { importModules, listModules } from '../controllers/moduleController.js';

const router = Router();

router.get('/', listModules);
router.post('/import', importModules);

export default router;
