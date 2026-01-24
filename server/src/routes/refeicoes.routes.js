import { Router } from 'express';
import RefeicaoController from '../controllers/RefeicaoController.js';
import authMiddleware from '../middlewares/authMiddleware.js';

const router = Router();
router.use(authMiddleware);

router.use(authMiddleware);
router.post('/', RefeicaoController.criar);
router.get('/', RefeicaoController.listar);
router.delete('/:id', RefeicaoController.excluir);

export default router;
