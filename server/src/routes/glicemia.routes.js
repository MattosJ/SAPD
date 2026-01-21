import { Router } from 'express';
import RegistroGlicemiaController from '../controllers/RegistroGlicemiaController.js';
import authMiddleware from '../middlewares/authMiddleware.js';

const router = Router();

// 🔐 todas as rotas abaixo exigem login
router.use(authMiddleware);

router.post('/', RegistroGlicemiaController.registrar);
router.get('/', RegistroGlicemiaController.listar);

export default router;
