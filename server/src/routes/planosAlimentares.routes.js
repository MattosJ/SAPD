import { Router } from 'express';
import PlanoAlimentarController from '../controllers/PlanoAlimentarController.js';
import authMiddleware from '../middlewares/authMiddleware.js';

const router = Router();
router.use(authMiddleware);

router.post('/', PlanoAlimentarController.criar);
router.get('/', PlanoAlimentarController.listar);

export default router;
