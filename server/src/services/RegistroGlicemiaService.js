import RegistroGlicemiaRepository from '../repositories/RegistroGlicemiaRepository.js';
import RegistroGlicemia from '../entities/RegistroGlicemia.js';

class RegistroGlicemiaService {

  async criar(dados) {
    const registro = new RegistroGlicemia(dados);

    const dataMedicao = new Date(registro.data_hora);
    if (dataMedicao > new Date()) {
      throw new Error('Medição não pode estar no futuro');
    }

    return RegistroGlicemiaRepository.criar(registro);
  }

  async listar(usuarioId) {

    const medicoes = await RegistroGlicemiaRepository.buscarMedicoes(usuarioId);
    const ultimos = await RegistroGlicemiaRepository.buscarUltimosRegistros(usuarioId);

    return {
      medicoes,
      ultimosRegistros: ultimos
    };
  }

  async buscar(id, usuario_id) {
    const registro = await RegistroGlicemiaRepository.buscarPorId(id, usuario_id);
    if (!registro) throw new Error('Registro não encontrado');
    return registro;
  }

  async atualizar(id, usuario_id, dados) {
    const atualizado = await RegistroGlicemiaRepository.atualizar(id, usuario_id, dados);
    if (!atualizado) throw new Error('Registro não encontrado');
    return atualizado;
  }

  async excluir(id, usuario_id) {
    await RegistroGlicemiaRepository.excluir(id, usuario_id);
  }
}

export default new RegistroGlicemiaService();
