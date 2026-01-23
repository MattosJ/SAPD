import AlimentoRepository from '../repositories/AlimentoRepository.js';

class AlimentoService {
  async cadastrar(dados) {
    return AlimentoRepository.criar(dados);
  }

  async listar() {
    return AlimentoRepository.listar();
  }
}

export default new AlimentoService();