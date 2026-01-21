import AlimentoService from '../services/AlimentoService.js';

class AlimentoController {

  async cadastrar(req, res) {
    try {
      const alimento = await AlimentoService.cadastrar(req.body);
      return res.status(201).json(alimento);
    } catch (error) {
      return res.status(400).json({ erro: error.message });
    }
  }

  async listar(req, res) {
    const alimentos = await AlimentoService.listar();
    return res.json(alimentos);
  }
}

export default new AlimentoController();
