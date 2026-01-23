import { Router } from 'express';
import LembreteController from '../controllers/LembreteController.js';
import authMiddleware from '../middlewares/authMiddleware.js';

const router = Router();
router.use(authMiddleware);

router.post('/', LembreteController.criar);
router.get('/', LembreteController.listar);
router.put('/:id', LembreteController.atualizar);
router.delete('/:id', LembreteController.excluir);

export default router;
