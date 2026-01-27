import RegistroInsulinaRepository from '../repositories/RegistroInsulinaRepository.js';
import RegistroInsulina from '../entities/RegistroInsulina.js';

class RegistroInsulinaService {

  async criar(dados) {
    const registro = new RegistroInsulina(dados);

    const dataAplicacao = new Date(registro.data_hora);
    if (dataAplicacao > new Date()) {
      throw new Error('Aplicação não pode estar no futuro');
    }

    return RegistroInsulinaRepository.criar(registro);
  }

  async listar(usuario_id) {
    return RegistroInsulinaRepository.listarPorUsuario(usuario_id);
  }

  async buscar(id, usuario_id) {
    const registro = await RegistroInsulinaRepository.buscarPorId(id, usuario_id);
    if (!registro) throw new Error('Registro não encontrado');
    return registro;
  }

  async atualizar(id, usuario_id, dados) {
    const atualizado = await RegistroInsulinaRepository.atualizar(id, usuario_id, dados);
    if (!atualizado) throw new Error('Registro não encontrado');
    return atualizado;
  }

  async excluir(id, usuario_id) {
    await RegistroInsulinaRepository.excluir(id, usuario_id);
  }
}

export default new RegistroInsulinaService();
