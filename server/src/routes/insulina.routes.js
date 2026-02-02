import { Router } from 'express';
import RegistroInsulinaController from '../controllers/RegistroInsulinaController.js';
import authMiddleware from '../middlewares/authMiddleware.js';

const router = Router();

router.use(authMiddleware);

/**
 * @swagger
 * tags:
 *   name: Insulina
 *   description: Registro e controle de aplicação de insulina
 */

/**
 * @swagger
 * /insulina:
 *   post:
 *     summary: Registra uma aplicação de insulina
 *     tags: [Insulina]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/InsulinaCreate'
 *     responses:
 *       201:
 *         description: Aplicação registrada com sucesso
 */
router.post('/', RegistroInsulinaController.criar);

/**
 * @swagger
 * /insulina:
 *   get:
 *     summary: Lista todas as aplicações de insulina do usuário
 *     tags: [Insulina]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Lista de aplicações
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/InsulinaLista'
 */
router.get('/', RegistroInsulinaController.listar);

/**
 * @swagger
 * /insulina/{id}:
 *   get:
 *     summary: Busca uma aplicação de insulina pelo ID
 *     tags: [Insulina]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Aplicação encontrada
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/InsulinaRegistro'
 *       404:
 *         description: Registro não encontrado
 */
router.get('/:id', RegistroInsulinaController.buscar);

/**
 * @swagger
 * /insulina/{id}:
 *   put:
 *     summary: Atualiza uma aplicação de insulina
 *     tags: [Insulina]
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
 *             $ref: '#/components/schemas/InsulinaUpdate'
 *     responses:
 *       200:
 *         description: Aplicação atualizada com sucesso
 */
router.put('/:id', RegistroInsulinaController.atualizar);

/**
 * @swagger
 * /insulina/{id}:
 *   delete:
 *     summary: Remove um registro de insulina
 *     tags: [Insulina]
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
 *         description: Registro removido com sucesso
 */
router.delete('/:id', RegistroInsulinaController.excluir);

export default router;
