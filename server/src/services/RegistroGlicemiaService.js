import RegistroGlicemia from '../entities/RegistroGlicemia.js';
import RegistroGlicemiaRepository from '../repositories/RegistroGlicemiaRepository.js';
import AlertaService from './AlertaService.js';
class RegistroGlicemiaService {

  async registrar(dados) {
    const agora = new Date();
    const dataMedicao = new Date(dados.data_hora);

    if (dataMedicao > agora) {
      throw new Error('Medição com data futura não é permitida');
    }
    await AlertaService.verificarGlicemia(usuarioId);
    return RegistroGlicemiaRepository.salvar(dados);
    await AlertaService.verificarGlicemia(usuarioId);

  }

  async listarPorUsuario(usuarioId) {
    return RegistroGlicemiaRepository.listarPorUsuario(usuarioId);
  }
}

export default new RegistroGlicemiaService();
