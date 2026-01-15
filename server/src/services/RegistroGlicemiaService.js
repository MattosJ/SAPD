import RegistroGlicemia from '../entities/RegistroGlicemia.js';
import RegistroGlicemiaRepository from '../repositories/RegistroGlicemiaRepository.js';

class RegistroGlicemiaService {

  async registrar(dados) {
    // Criação da entidade (validação automática)
    const registro = new RegistroGlicemia(dados);

    // Persistência
    return RegistroGlicemiaRepository.salvar(registro);
  }

  async listarPorUsuario(usuarioId) {
    if (!usuarioId) {
      throw new Error('Usuário não informado');
    }

    return RegistroGlicemiaRepository.listarPorUsuario(usuarioId);
  }
}

export default new RegistroGlicemiaService();
