import { Router } from 'express';
import LembreteController from '../controllers/LembreteController.js';
import authMiddleware from '../middlewares/authMiddleware.js';

const router = Router();
router.use(authMiddleware);

/**
 * @swagger
 * /lembretes:
 *   post:
 *     summary: Criar lembrete
 *     tags: [Lembretes]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/LembreteInput'
 *     responses:
 *       201:
 *         description: Lembrete criado com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Lembrete'
 */
router.post('/', LembreteController.criar);

/**
 * @swagger
 * /lembretes:
 *   get:
 *     summary: Listar lembretes do usuário
 *     tags: [Lembretes]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Lista de lembretes
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Lembrete'
 */
router.get('/', LembreteController.listar);

/**
 * @swagger
 * /lembretes/{id}:
 *   put:
 *     summary: Atualizar lembrete
 *     tags: [Lembretes]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/LembreteInput'
 *     responses:
 *       200:
 *         description: Lembrete atualizado
 */

router.put('/:id', LembreteController.atualizar);

/**
 * @swagger
 * /lembretes/{id}:
 *   delete:
 *     summary: Excluir lembrete
 *     tags: [Lembretes]
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
 *         description: Lembrete excluído
 */

router.delete('/:id', LembreteController.excluir);

export default router;
