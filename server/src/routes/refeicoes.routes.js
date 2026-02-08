import { Router } from 'express';
import RefeicaoController from '../controllers/RefeicaoController.js';
import authMiddleware from '../middlewares/authMiddleware.js';

/**
 * @swagger
 * tags:
 *   name: Refeições
 *   description: Gerenciamento de refeições do usuário
 */
const router = Router();
router.use(authMiddleware);



/**
 * @swagger
 * /refeicoes:
 *   post:
 *     summary: Criar uma nova refeição
 *     tags: [Refeições]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - nome
 *               - data
 *               - calorias
 *             properties:
 *               nome:
 *                 type: string
 *                 example: Café da manhã
 *               data:
 *                 type: string
 *                 format: date
 *                 example: 2026-01-30
 *               hora:
 *                 type: string
 *                 example: 08:00
 *               calorias:
 *                 type: number
 *                 example: 350
 *     responses:
 *       201:
 *         description: Refeição criada com sucesso
 *       400:
 *         description: Dados inválidos
 *       401:
 *         description: Não autorizado
 */
router.post('/', RefeicaoController.criar);


/**
 * @swagger
 * /refeicoes:
 *   get:
 *     summary: Listar refeições do usuário
 *     tags: [Refeições]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Lista de refeições
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: integer
 *                     example: 1
 *                   nome:
 *                     type: string
 *                     example: Almoço
 *                   data:
 *                     type: string
 *                     example: 30/01
 *                   hora:
 *                     type: string
 *                     example: 12:00
 *                   calorias:
 *                     type: number
 *                     example: 700
 *       401:
 *         description: Não autorizado
 */
router.get('/', RefeicaoController.listar);


/**
 * @swagger
 * /refeicoes/{id}:
 *   delete:
 *     summary: Excluir uma refeição
 *     tags: [Refeições]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID da refeição
 *     responses:
 *       200:
 *         description: Refeição excluída com sucesso
 *       404:
 *         description: Refeição não encontrada
 *       401:
 *         description: Não autorizado
 */
router.delete('/:id', RefeicaoController.excluir);

export default router;
