import { Router } from 'express';
import UsuarioController from '../controllers/UsuarioController.js';
import authMiddleware from '../middlewares/authMiddleware.js';

const router = Router();

/**


 * @swagger
 * /usuario/cadastrar:
 *   post:
 *     summary: Cadastra um novo usuário
 *     tags: [Usuário]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - nome_completo
 *               - email
 *               - senha
 *               - data_nascimento
 *               - tipo_diabetes
 *             properties:
 *               nome_completo:
 *                 type: string
 *                 example: Ana Souza
 *               email:
 *                 type: string
 *                 example: ana@sapd.com
 *               senha:
 *                 type: string
 *                 example: 123456
 *               data_nascimento:
 *                 type: string
 *                 format: date
 *                 example: 1998-05-01
 *               tipo_diabetes:
 *                 type: string
 *                 example: Tipo 1
 *               peso:
 *                 type: number
 *                 example: 75.5
 *               altura:
 *                 type: number
 *                 example: 1.75
 *     responses:
 *       201:
 *         description: Usuário cadastrado com sucesso
 *       400:
 *         description: Dados inválidos
 */
router.post('/cadastrar', UsuarioController.cadastrar);

/**
 * @swagger
 * /usuario/login:
 *   post:
 *     summary: Autentica o usuário e retorna um token JWT
 *     tags: [Usuário]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - email
 *               - senha
 *             properties:
 *               email:
 *                 type: string
 *                 example: joao@email.com
 *               senha:
 *                 type: string
 *                 example: 123456
 *     responses:
 *       200:
 *         description: Login realizado com sucesso
 *       401:
 *         description: Credenciais inválidas
 */
router.post('/login', UsuarioController.login);

/**
 * @swagger
 * /usuario/recuperar-senha:
 *   post:
 *     summary: Envia e-mail para recuperação de senha
 *     tags: [Usuário]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - email
 *             properties:
 *               email:
 *                 type: string
 *                 example: joao@email.com
 *     responses:
 *       200:
 *         description: E-mail de recuperação enviado
 */
router.post('/recuperar-senha', UsuarioController.recuperarSenha);

/**
 * @swagger
 * /usuario/redefinir-senha:
 *   post:
 *     summary: Redefine a senha do usuário
 *     tags: [Usuário]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - token
 *               - novaSenha
 *             properties:
 *               token:
 *                 type: string
 *                 example: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9
 *               novaSenha:
 *                 type: string
 *                 example: 123456
 *     responses:
 *       200:
 *         description: Senha redefinida com sucesso
 */
router.post('/redefinir-senha', UsuarioController.redefinirSenha);

// 🔒 rotas protegidas
router.use(authMiddleware);

/**
 * @swagger
 * /usuario:
 *   get:
 *     summary: Retorna os dados do usuário autenticado
 *     tags: [Usuário]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Dados do usuário retornados
 *       401:
 *         description: Não autorizado
 */
router.get('/', UsuarioController.me);

/**
 * @swagger
 * /usuario:
 *   get:
 *     summary: Retorna os dados do usuário autenticado
 *     tags: [Usuário]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Dados completos do usuário
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Usuario'
 *       401:
 *         description: Não autorizado
 */
router.get('/', UsuarioController.me);

router.put('/me', UsuarioController.atualizar);

/**
 * @swagger
 * /usuario/me:
 *   delete:
 *     summary: Inativa a conta do usuário
 *     tags: [Usuário]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       204:
 *         description: Usuário inativado com sucesso
 */
router.delete('/me', UsuarioController.inativar);

export default router;
