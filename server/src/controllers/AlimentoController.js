import AlimentoService from '../services/AlimentoService.js';

class AlimentoController {

  //Cria um novo alimento
  async criar(req, res) {
    try {
      const a = await AlimentoService.criar(req.body);
      res.status(201).json(a);
    } catch (e) {
      res.status(400).json({ erro: e.message });
    }
  }

  // lista todos alimentos
  async listar(req, res) {
    const lista = await AlimentoService.listar();
    res.json(lista);
  }

  //Atualiza um alimento especifico
  async atualizar(req, res) {
    const a = await AlimentoService.atualizar(req.params.id, req.body);
    res.json(a);
  }

  //Exclui um alimento especifico
  async excluir(req, res) {
    await AlimentoService.excluir(req.params.id);
    res.status(204).send();
  }
}

export default new AlimentoController();
