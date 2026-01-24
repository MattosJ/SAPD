import { Router } from 'express';
import RegistroGlicemiaController from '../controllers/RegistroGlicemiaController.js';
import authMiddleware from '../middlewares/authMiddleware.js';

const router = Router();

//  todas as rotas abaixo exigem login
router.use(authMiddleware);

router.post('/', RegistroGlicemiaController.criar);
router.get('/', RegistroGlicemiaController.listar);
router.get('/:id', RegistroGlicemiaController.buscar);
router.put('/:id', RegistroGlicemiaController.atualizar);
router.delete('/:id', RegistroGlicemiaController.excluir);
export default router;
