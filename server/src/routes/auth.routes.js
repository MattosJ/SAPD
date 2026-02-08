import { Router } from 'express';
import AuthController from '../controllers/AuthController.js';


const router = Router();

/**
 * @swagger
 * /auth/login:
 *   post:
 *     summary: Realizar login do usuário
 *     tags: [Autenticação]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/AuthLoginInput'
 *     responses:
 *       200:
 *         description: Login realizado com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/AuthLoginResponse'
 *       401:
 *         description: Credenciais inválidas
 */

router.post('/login', AuthController.login);

export default router;
