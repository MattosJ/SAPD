import LembreteRepository from '../repositories/LembreteRepository.js';


class LembreteService {

  async criar(dados) {
    const agora = new Date();
    const dataLembrete = new Date(dados.data_hora);
    const TIPOS_VALIDOS= ['refeicao', 'insulina', 'glicemia'];


    if (dataLembrete < agora) {
      throw new Error('Não é permitido criar lembrete no passado');
    }

    if (!TIPOS_VALIDOS.includes(dados.tipo)) {
      throw new Error('Tipo de lembrete inválido');
    }

    return LembreteRepository.criar(dados);
  }

  async listar(usuarioId) {
    return LembreteRepository.listarPorUsuario(usuarioId);
  }

  async atualizar(id, usuarioId, dados) {

    if (dados.tipo && !TIPOS_VALIDOS.includes(dados.tipo)) {
      throw new Error('Tipo de lembrete inválido');
    }

    return LembreteRepository.atualizar(id, usuarioId, dados);
  }

  async excluir(id, usuarioId) {
    return LembreteRepository.excluir(id, usuarioId);
  }
}
export default new LembreteService();
