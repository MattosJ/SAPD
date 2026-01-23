import { Router } from 'express';
import RegistroInsulinaController from '../controllers/RegistroInsulinaController.js';
import authMiddleware from '../middlewares/authMiddleware.js';

const router = Router();

// todas protegidas
router.use(authMiddleware);

router.post('/', RegistroInsulinaController.registrar);
router.get('/', RegistroInsulinaController.listar);
router.delete('/:id', RegistroInsulinaController.excluir);

export default router;
