import RegistroInsulinaRepository from '../repositories/RegistroInsulinaRepository.js';

class RegistroInsulinaService {

  async registrar(dados) {
    const agora = new Date();
    const dataAplicacao = new Date(dados.data_hora);

    if (dataAplicacao > agora) {
      throw new Error('Aplicação de insulina com data futura não é permitida');
    }

    if (dados.quantidade_insulina <= 0) {
      throw new Error('Quantidade de insulina inválida');
    }

    return RegistroInsulinaRepository.criar(dados);
  }

  async listar(usuarioId) {
    return RegistroInsulinaRepository.listarPorUsuario(usuarioId);
  }

  async excluir(id, usuarioId) {
    return RegistroInsulinaRepository.excluir(id, usuarioId);
  }
}

export default new RegistroInsulinaService();
