import RefeicaoAlimentoRepository from '../repositories/RefeicaoAlimentoRepository.js';

class AdicionarAlimentoRefeicaoService {

  async executar(dados) {
    if (!dados.refeicao_id || !dados.alimento_id || !dados.quantidade) {
      throw new Error('Dados obrigatórios não informados');
    }

    if (dados.quantidade <= 0) {
      throw new Error('Quantidade inválida');
    }

    return await RefeicaoAlimentoRepository.adicionar(dados);
  }
}

export default new AdicionarAlimentoRefeicaoService();
