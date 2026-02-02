import { Router } from 'express';
import RelatorioController from '../controllers/RelatorioController.js';
import authMiddleware from '../middlewares/authMiddleware.js';

const router = Router();
router.use(authMiddleware);

router.get('/',RelatorioController.buscarPrincipal);
router.get('/:tipoSelecao', RelatorioController.buscarPorTempo);

export default router;
