import { Router } from 'express';
import RelatorioController from '../controllers/RelatorioController.js';
import authMiddleware from '../middlewares/authMiddleware.js';

const router = Router();
router.use(authMiddleware);


/**
 * @swagger
 * /relatorios:
 *   get:
 *     summary: Retorna dados completos do dashboard
 *     tags: [Relatórios]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Dados completos do dashboard
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/RelatorioDashboardCompleto'
 */
router.get('/', RelatorioController.buscarPrincipal);

/**
 * @swagger
 * /relatorios/{tipoSelecao}:
 *   get:
 *     summary: Retorna relatórios filtrados por período
 *     tags: [Relatórios]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: tipoSelecao
 *         required: true
 *         schema:
 *           type: string
 *           enum: [dia, semana, mes, ano]
 *     responses:
 *       200:
 *         description: Relatório filtrado por período
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/RelatorioPorPeriodo'
 */
router.get('/:tipoSelecao', RelatorioController.buscarPorTempo);

export default router;
