import RefeicaoRepository from '../repositories/RefeicaoRepository.js';

class RefeicaoService {

  async criar(dados) {
    const refeicao = await RefeicaoRepository.criar(dados);

    for (const item of dados.alimentos) {
      await RefeicaoRepository.adicionarAlimento(
        refeicao.id,
        item.alimento_id,
        item.quantidade
      );
    }

    return refeicao;
  }

  async listar(usuarioId) {
    return RefeicaoRepository.listarPorUsuario(usuarioId);
  }
}

export default new RefeicaoService();
