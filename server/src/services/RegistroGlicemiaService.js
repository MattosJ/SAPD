import RegistroGlicemiaRepository from '../repositories/RegistroGlicemiaRepository.js';
import RegistroGlicemia from '../entities/RegistroGlicemia.js';
import {formatarDataHora} from '../utils/formatarDataHora.js'
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


  async buscar(usuarioId, tipo) {

    let dias = 30;

    if (tipo === 'ano') dias = 365;
    if (tipo === 'meses') dias = 90;
    if (tipo === 'mes') dias = 30;

    const medicoesDB = await RegistroGlicemiaRepository.buscarPorPeriodo(usuarioId, dias);
    const ultimosDB = await RegistroGlicemiaRepository.ultimosRegistros(usuarioId);
    const predicoesDB = await RegistroGlicemiaRepository.predicoes(usuarioId, dias);

    const medicoes = medicoesDB.map(m => ({
      data: m.data_hora.toISOString().split('T')[0],
      valor: m.valor
    }));

    const ultimosRegistros = ultimosDB.map(m => ({
      id: m.id, 
      data: m.data_hora.toISOString().split('T')[0],
      hora: m.data_hora.toTimeString().slice(0,5),
      valor: m.valor
    }));

      const predicoes = predicoesDB.map(p => {

        const { data, hora } = formatarDataHora(p.data_hora);

        return {
          ...p,
          data,
          hora,
          created_at:undefined,
          data_hora: undefined
        };
      });
    console.log(usuarioId);
    return {
      medicoes,
      ultimosRegistros,
      predicoes
    };
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
