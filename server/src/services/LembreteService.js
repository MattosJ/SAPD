import LembreteRepository from '../repositories/LembreteRepository.js';

class LembreteService {

  async criar(dados) {
    const agora = new Date();
    const dataLembrete = new Date(dados.data_hora);

    if (dataLembrete < agora) {
      throw new Error('Não é permitido criar lembrete no passado');
    }

    return LembreteRepository.criar(dados);
  }

  async listar(usuarioId) {
    return LembreteRepository.listarPorUsuario(usuarioId);
  }

  async atualizar(id, usuarioId, dados) {
    return LembreteRepository.atualizar(id, usuarioId, dados);
  }

  async excluir(id, usuarioId) {
    return LembreteRepository.excluir(id, usuarioId);
  }
}

export default new LembreteService();
