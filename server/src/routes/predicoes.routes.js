import { Router } from 'express';
import PredicaoController from '../controllers/PredicaoGlicemiaController.js';
import authMiddleware from '../middlewares/authMiddleware.js';

const router = Router();
router.use(authMiddleware);

router.post('/', PredicaoController.gerar);
router.put('/:id/confirmar', PredicaoController.confirmar);
router.get('/', PredicaoController.listar);

export default router;
