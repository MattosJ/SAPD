import { Router } from 'express';
import AlertaController from '../controllers/AlertaController.js';
import authMiddleware from '../middlewares/authMiddleware.js';

const router = Router();
router.use(authMiddleware);

router.get('/', AlertaController.listar);
router.put('/:id/lido', AlertaController.marcarLido);

export default router;
