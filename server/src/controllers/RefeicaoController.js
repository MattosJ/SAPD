import RefeicaoService from '../services/RefeicaoService.js';

class RefeicaoController {

  async criar(req, res) {
    const r = await RefeicaoService.criar({
      ...req.body,
      usuario_id: req.usuario.id
    });
    res.status(201).json(r);
  }

  async listar(req, res) {
    const lista = await RefeicaoService.listar(req.usuario.id);
    res.json(lista);
  }

  async excluir(req, res) {
    await RefeicaoService.excluir(req.params.id, req.usuario.id);
    res.status(204).send();
  }
}

export default new RefeicaoController();
