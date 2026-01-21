import RefeicaoService from '../services/RefeicaoService.js';

class RefeicaoController {

  async criar(req, res) {
    try {
      const dados = {
        ...req.body,
        usuarioId: req.usuarioId
      };

      const refeicao = await RefeicaoService.criar(dados);
      return res.status(201).json(refeicao);
    } catch (error) {
      return res.status(400).json({ erro: error.message });
    }
  }

  async listar(req, res) {
    const refeicoes = await RefeicaoService.listar(req.usuarioId);
    return res.json(refeicoes);
  }
}

export default new RefeicaoController();
