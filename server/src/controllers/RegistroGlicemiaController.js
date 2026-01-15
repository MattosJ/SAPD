import RegistroGlicemiaService from '../services/RegistroGlicemiaService.js';

class RegistroGlicemiaController {

  async registrar(req, res) {
    try {
      const dados = {
        ...req.body,
        usuarioId: req.userId || 1 // temporário até JWT
      };

      const registro = await RegistroGlicemiaService.registrar(dados);
      return res.status(201).json(registro);
    } catch (error) {
      return res.status(400).json({ erro: error.message });
    }
  }

  async listar(req, res) {
    const registros = await RegistroGlicemiaService.listarPorUsuario(
      req.userId || 1
    );
    return res.json(registros);
  }
}

export default new RegistroGlicemiaController();
