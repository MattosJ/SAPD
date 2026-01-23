import { Router } from 'express';
import ComparacaoController from '../controllers/ComparacaoController.js';
import authMiddleware from '../middlewares/authMiddleware.js';

const router = Router();
router.use(authMiddleware);

router.get('/plano-consumo', ComparacaoController.comparar);

export default router;
