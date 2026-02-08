import { Router } from 'express';
import ComparacaoController from '../controllers/ComparacaoController.js';
import authMiddleware from '../middlewares/authMiddleware.js';

const router = Router();
router.use(authMiddleware);


/**
 * @swagger
 * /comparacao/plano-consumo:
 *   get:
 *     summary: Comparar plano alimentar com consumo real
 *     tags: [Comparação]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Resultado da comparação entre plano e consumo
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ComparacaoPlanoConsumo'
 */

router.get('/plano-consumo', ComparacaoController.comparar);

export default router;
