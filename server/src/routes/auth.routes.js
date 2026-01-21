import { Router } from 'express';
import AuthController from '../controllers/AuthController.js';

const router = Router();

// POST /api/login
router.post('/login', AuthController.login);

export default router;
