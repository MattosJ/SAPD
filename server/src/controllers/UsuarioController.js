import UsuarioService from '../services/UsuarioService.js';

class UsuarioController {
  async cadastrar(req, res) {
    try {
      const usuario = await UsuarioService.cadastrar(req.body);
      return res.status(201).json(usuario);
    } catch (error) {
      return res.status(400).json({ erro: error.message });
    }
  }

  async login(req, res) {
    try {
      const token = await UsuarioService.login(req.body);
      return res.json({ token });
    } catch (error) {
      return res.status(401).json({ erro: error.message });
    }
  }
}

export default new UsuarioController();
