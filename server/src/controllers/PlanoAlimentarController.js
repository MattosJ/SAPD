import PlanoAlimentarService from '../services/PlanoAlimentarService.js';

class PlanoAlimentarController {

  async criar(req, res) {
    try {
      const plano = await PlanoAlimentarService.criar({
        ...req.body,
        usuarioId: req.usuarioId
      });
      return res.status(201).json(plano);
    } catch (error) {
      return res.status(400).json({ erro: error.message });
    }
  }

  async listar(req, res) {
    const planos = await PlanoAlimentarService.listar(req.usuarioId);
    return res.json(planos);
  }
}

export default new PlanoAlimentarController();
