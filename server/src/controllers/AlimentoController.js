import AlimentoService from '../services/AlimentoService.js';

class AlimentoController {

  async criar(req, res) {
    try {
      const a = await AlimentoService.criar(req.body);
      res.status(201).json(a);
    } catch (e) {
      res.status(400).json({ erro: e.message });
    }
  }

  async listar(req, res) {
    const lista = await AlimentoService.listar();
    res.json(lista);
  }

  async atualizar(req, res) {
    const a = await AlimentoService.atualizar(req.params.id, req.body);
    res.json(a);
  }

  async excluir(req, res) {
    await AlimentoService.excluir(req.params.id);
    res.status(204).send();
  }
}

export default new AlimentoController();
