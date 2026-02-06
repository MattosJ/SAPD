import RefeicaoRepository from '../repositories/RefeicaoRepository.js';

class RefeicaoService {
  //Cria uma refeição
  async criar(dados) {
    return RefeicaoRepository.criar(dados);
  }

  //Listar refeições
  async listar(usuario_id) {
    return RefeicaoRepository.listarPorUsuario(usuario_id);
  }

  //Exlui ás refeições
  async excluir(id, usuario_id) {
    await RefeicaoRepository.excluir(id, usuario_id);
  }
}

export default new RefeicaoService();
