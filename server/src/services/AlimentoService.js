import AlimentoRepository from '../repositories/AlimentoRepository.js';

class AlimentoService {

  async criar(dados) {
    if (!dados.nome) throw new Error('Nome do alimento é obrigatório');
    return AlimentoRepository.criar(dados);
  }

  async listar() {
    return AlimentoRepository.listar();
  }

  async atualizar(id, dados) {
    return AlimentoRepository.atualizar(id, dados);
  }

  async excluir(id) {
    await AlimentoRepository.excluir(id);
  }
}

export default new AlimentoService();
