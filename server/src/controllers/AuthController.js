import UsuarioService from '../services/UsuarioService.js';

/**
 * @swagger
 * /auth/login:
 * post:
 * summary: Realiza o login do usuário
 * tags: [Autenticação]
 * requestBody:
 * required: true
 * content:
 * application/json:
 * schema:
 * type: object
 * properties:
 * email: { type: string }
 * senha: { type: string }
 * responses:
 * 200:
 * description: Login realizado com sucesso
 * 401:
 * description: E-mail ou senha inválidos
 */class AuthController {
  async login(req, res) {
    try {
      const { email, senha } = req.body;
      const resultado = await UsuarioService.login({ email, senha });
      return res.json(resultado);
    } catch (error) {
      return res.status(401).json({ erro: error.message });
    }
  }
}

export default new AuthController();
