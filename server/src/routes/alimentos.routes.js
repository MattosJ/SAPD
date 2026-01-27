import { Router } from 'express';
import AlimentoController from '../controllers/AlimentoController.js';
import authMiddleware from '../middlewares/authMiddleware.js';

const router = Router();
router.use(authMiddleware);

router.post('/', AlimentoController.criar);
router.get('/', AlimentoController.listar);
router.put('/:id', AlimentoController.atualizar);
router.delete('/:id', AlimentoController.excluir);

export default router;
