import { Router } from 'express';
import PredicaoController from '../controllers/PredicaoGlicemiaController.js';
import authMiddleware from '../middlewares/authMiddleware.js';

const router = Router();
router.use(authMiddleware);

/**
 * @swagger
 * /predicoes:
 *   post:
 *     summary: Gerar predição de glicemia
 *     tags: [Predições]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: false
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/PredicaoInput'
 *     responses:
 *       201:
 *         description: Predição gerada com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/PredicaoGlicemia'
 */

router.post('/', PredicaoController.gerar);

/**
 * @swagger
 * /predicoes/{id}/confirmar:
 *   put:
 *     summary: Confirmar predição informando valor real
 *     tags: [Predições]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID da predição
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/ConfirmarPredicaoInput'
 *     responses:
 *       200:
 *         description: Predição confirmada com sucesso
 */

router.put('/:id/confirmar', PredicaoController.confirmar);
/**
 * @swagger
 * /predicoes/{id}/confirmar:
 *   put:
 *     summary: Confirmar predição informando valor real
 *     tags: [Predições]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID da predição
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/ConfirmarPredicaoInput'
 *     responses:
 *       200:
 *         description: Predição confirmada com sucesso
 */

router.get('/', PredicaoController.listar);

export default router;
