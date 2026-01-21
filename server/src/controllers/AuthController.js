import UsuarioService from '../services/UsuarioService.js';

class AuthController {
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
