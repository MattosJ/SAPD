import { Router } from 'express';
import RegistroGlicemiaController from '../controllers/RegistroGlicemiaController.js';
import authMiddleware from '../middlewares/authMiddleware.js';

const router = Router();

// todas exigem autenticação
router.use(authMiddleware);

/**
 * @swagger
 * tags:
 *   name: Glicemia
 *   description: Registro e controle de glicemia
 */

/**
 * @swagger
 * /glicemia:
 *   post:
 *     summary: Registra uma nova medição de glicemia
 *     tags: [Glicemia]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/GlicemiaCreate'
 *     responses:
 *       201:
 *         description: Medição registrada com sucesso
 */
router.post('/', RegistroGlicemiaController.criar);

/**
 * @swagger
 * /glicemia:
 *   get:
 *     summary: Lista todas as medições de glicemia do usuário
 *     tags: [Glicemia]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Lista de medições
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/GlicemiaLista'
 */
router.get('/', RegistroGlicemiaController.listar);

/**
 * @swagger
 * /glicemia/{tipoSelecao}:
 *   get:
 *     summary: Lista medições de glicemia filtradas por período
 *     tags: [Glicemia]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: tipoSelecao
 *         required: true
 *         schema:
 *           type: string
 *           enum: [dia, semana, mes, ano]
 *         description: Período de filtragem
 *     responses:
 *       200:
 *         description: Lista filtrada de medições
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/GlicemiaLista'
 */
router.get('/:tipoSelecao', RegistroGlicemiaController.listar);

/**
 * @swagger
 * /glicemia/{id}:
 *   put:
 *     summary: Atualiza uma medição de glicemia
 *     tags: [Glicemia]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID da medição
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/GlicemiaUpdate'
 *     responses:
 *       200:
 *         description: Medição atualizada com sucesso
 */
router.put('/:id', RegistroGlicemiaController.atualizar);

/**
 * @swagger
 * /glicemia/{id}:
 *   delete:
 *     summary: Remove uma medição de glicemia
 *     tags: [Glicemia]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID da medição
 *     responses:
 *       204:
 *         description: Medição removida com sucesso
 */
router.delete('/:id', RegistroGlicemiaController.excluir);

export default router;
