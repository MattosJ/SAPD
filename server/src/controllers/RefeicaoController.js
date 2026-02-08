import RefeicaoService from '../services/RefeicaoService.js';

class RefeicaoController {

async criar(req, res) {
  try {

    const dados = {
      ...req.body,
      usuario_id: req.usuario.id
    };

    const refeicao = await RefeicaoService.criar(dados);

    return res.status(201).json(refeicao);

  } catch (erro) {
    return res.status(400).json({ erro: erro.message });
  }
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