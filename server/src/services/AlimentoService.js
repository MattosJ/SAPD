import AlimentoRepository from '../repositories/AlimentoRepository.js';

class AlimentoService {

  //valida os dados de entrada
  async criar(dados) {
    if (!dados.nome) throw new Error('Nome do alimento é obrigatório');
    return AlimentoRepository.criar(dados);
  }

  //lista todos alimentos
  async listar() {
    return AlimentoRepository.listar();
  }

  //Atualiza um alimento especifico
  async atualizar(id, dados) {
    return AlimentoRepository.atualizar(id, dados);
  }

  //Exclui um alimento especifico
  async excluir(id) {
    await AlimentoRepository.excluir(id);
  }
}

export default new AlimentoService();
