import { Router } from 'express';
import authMiddleware from '../middlewares/authMiddleware.js';
import RefeicaoAlimentoController from '../controllers/RefeicaoAlimentoController.js';

const router = Router();

router.use(authMiddleware);

router.post(
  '/refeicoes/:refeicaoId/alimentos',
  RefeicaoAlimentoController.adicionar
);

router.get(
  '/refeicoes/:refeicaoId/alimentos',
  RefeicaoAlimentoController.listar
);

router.delete(
  '/refeicao-alimentos/:id',
  RefeicaoAlimentoController.remover
);

export default router;
