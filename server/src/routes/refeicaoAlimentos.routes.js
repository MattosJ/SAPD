import { Router } from 'express';
import authMiddleware from '../middlewares/authMiddleware.js';
import RefeicaoAlimentoController from '../controllers/RefeicaoAlimentoController.js';

const router = Router();

router.use(authMiddleware);

/**
 * @swagger
 * /refeicoes/{refeicaoId}/alimentos:
 *   post:
 *     summary: Adicionar alimento à refeição
 *     tags: [Refeições]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: refeicaoId
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID da refeição
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/RefeicaoAlimentoInput'
 *     responses:
 *       201:
 *         description: Alimento adicionado com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/RefeicaoAlimento'
 */

router.post(
  '/refeicoes/:refeicaoId/alimentos',
  RefeicaoAlimentoController.adicionar
);

/**
 * @swagger
 * /refeicoes/{refeicaoId}/alimentos:
 *   get:
 *     summary: Listar alimentos da refeição
 *     tags: [Refeições]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: refeicaoId
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Lista de alimentos da refeição
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/RefeicaoAlimento'
 */
router.get(
  '/refeicoes/:refeicaoId/alimentos',
  RefeicaoAlimentoController.listar
);

/**
 * @swagger
 * /refeicao-alimentos/{id}:
 *   delete:
 *     summary: Remover alimento da refeição
 *     tags: [Refeições]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       204:
 *         description: Alimento removido com sucesso
 */

router.delete(
  '/refeicao-alimentos/:id',
  RefeicaoAlimentoController.remover
);

export default router;
