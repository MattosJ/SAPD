import { Router } from 'express';
import RegistroInsulinaController from '../controllers/RegistroInsulinaController.js';
import authMiddleware from '../middlewares/authMiddleware.js';

const router = Router();

// todas protegidas
router.use(authMiddleware);

router.post('/', RegistroInsulinaController.criar);
router.get('/', RegistroInsulinaController.listar);
router.get('/:id', RegistroInsulinaController.buscar);
router.put('/:id', RegistroInsulinaController.atualizar);
router.delete('/:id', RegistroInsulinaController.excluir);

export default router;
