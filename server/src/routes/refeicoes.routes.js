import { Router } from 'express';
import RefeicaoController from '../controllers/RefeicaoController.js';
import authMiddleware from '../middlewares/authMiddleware.js';

const router = Router();
router.use(authMiddleware);

router.post('/', RefeicaoController.criar);
router.get('/', RefeicaoController.listar);

export default router;
