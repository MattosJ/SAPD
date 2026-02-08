import { Router } from 'express';
import PlanoAlimentarController from '../controllers/PlanoAlimentarController.js';
import authMiddleware from '../middlewares/authMiddleware.js';

const router = Router();
router.use(authMiddleware);
/**
 * @swagger
 * /planos-alimentares:
 *   post:
 *     summary: Criar plano alimentar
 *     tags: [Plano Alimentar]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/PlanoAlimentarInput'
 *     responses:
 *       201:
 *         description: Plano alimentar criado com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/PlanoAlimentar'
 */

router.post('/', PlanoAlimentarController.criar);

/**
 * @swagger
 * /planos-alimentares:
 *   get:
 *     summary: Listar planos alimentares do usuário
 *     tags: [Plano Alimentar]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Lista de planos alimentares
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/PlanoAlimentar'
 */

router.get('/', PlanoAlimentarController.listar);

/**
 * @swagger
 * /planos-alimentares/{id}:
 *   delete:
 *     summary: Excluir plano alimentar
 *     tags: [Plano Alimentar]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID do plano alimentar
 *     responses:
 *       204:
 *         description: Plano alimentar excluído com sucesso
 */

router.delete('/:id',PlanoAlimentarController.excluir);

export default router;
