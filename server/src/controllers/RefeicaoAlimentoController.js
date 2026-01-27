import AdicionarAlimentoRefeicaoService from '../services/AdicionarAlimentoRefeicaoService.js';
import RefeicaoAlimentoRepository from '../repositories/RefeicaoAlimentoRepository.js';

class RefeicaoAlimentoController {

  async adicionar(req, res) {
    try {
      const alimento = await AdicionarAlimentoRefeicaoService.executar({
        refeicao_id: req.params.refeicaoId,
        alimento_id: req.body.alimento_id,
        quantidade: req.body.quantidade
      });

      return res.status(201).json(alimento);

    } catch (error) {
      return res.status(400).json({ erro: error.message });
    }
  }

  async listar(req, res) {
    const itens = await RefeicaoAlimentoRepository.listarPorRefeicao(
      req.params.refeicaoId
    );
    return res.json(itens);
  }

  async remover(req, res) {
    await RefeicaoAlimentoRepository.remover(req.params.id);
    return res.status(204).send();
  }
}

export default new RefeicaoAlimentoController();
