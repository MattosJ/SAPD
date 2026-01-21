import { Router } from 'express';
import RelatorioController from '../controllers/RelatorioController.js';
import authMiddleware from '../middlewares/authMiddleware.js';

const router = Router();
router.use(authMiddleware);

router.get('/glicemia', RelatorioController.gerar);

export default router;
