import RegistroGlicemia from '../entities/RegistroGlicemia.js';
import RegistroGlicemiaRepository from '../repositories/RegistroGlicemiaRepository.js';

class RegistroGlicemiaService {

  async registrar(dados) {
    const agora = new Date();
    const dataMedicao = new Date(dados.data_hora);

    if (dataMedicao > agora) {
      throw new Error('Medição com data futura não é permitida');
    }

    return RegistroGlicemiaRepository.salvar(dados);
  }

  async listarPorUsuario(usuarioId) {
    return RegistroGlicemiaRepository.listarPorUsuario(usuarioId);
  }
}

export default new RegistroGlicemiaService();
