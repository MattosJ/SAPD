import { Router } from 'express';
import AlimentoController from '../controllers/AlimentoController.js';
import authMiddleware from '../middlewares/authMiddleware.js';

const router = Router();
router.use(authMiddleware);

router.post('/', AlimentoController.cadastrar);
router.get('/', AlimentoController.listar);

export default router;
