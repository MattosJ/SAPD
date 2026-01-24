import RefeicaoRepository from '../repositories/RefeicaoRepository.js';

class RefeicaoService {

  async criar(dados) {
    return RefeicaoRepository.criar(dados);
  }

  async listar(usuario_id) {
    return RefeicaoRepository.listarPorUsuario(usuario_id);
  }

  async excluir(id, usuario_id) {
    await RefeicaoRepository.excluir(id, usuario_id);
  }
}

export default new RefeicaoService();
