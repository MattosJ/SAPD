import { Router } from 'express';
import AlimentoController from '../controllers/AlimentoController.js';
import authMiddleware from '../middlewares/authMiddleware.js';

const router = Router();
router.use(authMiddleware);

/**
 * @swagger
 * /alimentos:
 *   post:
 *     summary: Criar alimento
 *     tags: [Alimentos]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/AlimentoInput'
 *     responses:
 *       201:
 *         description: Alimento criado com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Alimento'
 */

router.post('/', AlimentoController.criar);

/**
 * @swagger
 * /alimentos:
 *   get:
 *     summary: Listar alimentos
 *     tags: [Alimentos]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Lista de alimentos
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/AlimentoLista'
 */

router.get('/', AlimentoController.listar);


/**
 * @swagger
 * /alimentos/{id}:
 *   put:
 *     summary: Atualizar alimento
 *     tags: [Alimentos]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID do alimento
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/AlimentoUpdate'
 *     responses:
 *       200:
 *         description: Alimento atualizado com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Alimento'
 */


router.put('/:id', AlimentoController.atualizar);

/**
 * @swagger
 * /alimentos/{id}:
 *   delete:
 *     summary: Excluir alimento
 *     tags: [Alimentos]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID do alimento
 *     responses:
 *       204:
 *         description: Alimento excluído com sucesso
 */

router.delete('/:id', AlimentoController.excluir);

export default router;
