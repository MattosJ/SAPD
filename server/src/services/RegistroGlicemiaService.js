import RegistroGlicemiaRepository from '../repositories/RegistroGlicemiaRepository.js';
import RegistroGlicemia from '../entities/RegistroGlicemia.js';
import { formatarDataHora } from '../utils/formatarDataHora.js';

/**
 * Service responsável pelas regras de negócio relacionadas
 * aos registros de glicemia do usuário.
 *
 * Atua como camada intermediária entre Controller e Repository,
 * aplicando validações, formatações e organização dos dados.
 */
class RegistroGlicemiaService {

  /**
   * Cria um novo registro de glicemia
   *
   * Realiza a criação da entidade e delega a persistência ao Repository.
   *
   * @param {Object} dados - Dados do registro
   * @param {number} dados.usuario_id - ID do usuário
   * @param {number} dados.valor - Valor da glicemia
   * @param {string|Date} dados.data_hora - Data e hora da medição
   * @param {string} [dados.observacoes] - Observações adicionais
   *
   * @returns {Promise<Object>} Registro criado
   */
  async criar(dados) {
    const registro = new RegistroGlicemia(dados);

    return RegistroGlicemiaRepository.criar(registro);
  }


  /**
   * Lista registros resumidos de glicemia do usuário
   *
   * Retorna:
   * - Lista geral de medições
   * - Últimos registros realizados
   *
   * @param {number} usuarioId - ID do usuário autenticado
   *
   * @returns {Promise<Object>}
   * @returns {Array<Object>} return.medicoes - Lista de medições
   * @returns {Array<Object>} return.ultimosRegistros - Últimos registros inseridos
   */
  async listar(usuarioId) {

    const medicoes = await RegistroGlicemiaRepository.buscarMedicoes(usuarioId);
    const ultimos = await RegistroGlicemiaRepository.buscarUltimosRegistros(usuarioId);

    return {
      medicoes,
      ultimosRegistros: ultimos
    };
  }


  /**
   * Busca registros de glicemia por intervalo de tempo
   *
   * Intervalos disponíveis:
   * - mes → últimos 30 dias
   * - meses → últimos 90 dias
   * - ano → últimos 365 dias
   *
   * Retorna:
   * - Mediçōes do período
   * - Últimos registros
   * - Predições calculadas
   *
   * @param {number} usuarioId - ID do usuário
   * @param {string} tipo - Intervalo de tempo (mes | meses | ano)
   *
   * @returns {Promise<Object>}
   * @returns {Array<Object>} return.medicoes
   * @returns {Array<Object>} return.ultimosRegistros
   * @returns {Array<Object>} return.predicoes
   */
  async buscar(usuarioId, tipo) {

    let dias = 30;

    if (tipo === 'ano') dias = 365;
    if (tipo === 'meses') dias = 90;
    if (tipo === 'mes') dias = 30;

    const medicoesDB =
      await RegistroGlicemiaRepository.buscarPorPeriodo(usuarioId, dias);

    const ultimosDB =
      await RegistroGlicemiaRepository.ultimosRegistros(usuarioId);

    const predicoesDB =
      await RegistroGlicemiaRepository.predicoes(usuarioId, dias);


    /**
     * Formata medições para retorno de API
     */
    const medicoes = medicoesDB.map(m => ({
      data: m.data_hora.toISOString().split('T')[0],
      valor: m.valor
    }));


    /**
     * Formata últimos registros
     */
    const ultimosRegistros = ultimosDB.map(m => ({
      id: m.id,
      data: m.data_hora.toISOString().split('T')[0],
      hora: m.data_hora.toTimeString().slice(0, 5),
      valor: m.valor
    }));


    /**
     * Formata predições calculadas
     */
    const predicoes = predicoesDB.map(p => {

      const { data, hora } = formatarDataHora(p.data_hora);

      return {
        ...p,
        data,
        hora,
        created_at: undefined,
        data_hora: undefined
      };
    });

    return {
      medicoes,
      ultimosRegistros,
      predicoes
    };
  }


  /**
   * Atualiza um registro de glicemia
   *
   * @param {number} id - ID do registro
   * @param {number} usuario_id - ID do usuário
   * @param {Object} dados - Dados para atualização
   *
   * @throws {Error} Caso o registro não seja encontrado
   *
   * @returns {Promise<Object>} Registro atualizado
   */
  async atualizar(id, usuario_id, dados) {

    const atualizado =
      await RegistroGlicemiaRepository.atualizar(id, usuario_id, dados);

    if (!atualizado)
      throw new Error('Registro não encontrado');

    return atualizado;
  }


  /**
   * Remove um registro de glicemia
   *
   * @param {number} id - ID do registro
   * @param {number} usuario_id - ID do usuário
   *
   * @returns {Promise<void>}
   */
  async excluir(id, usuario_id) {
    await RegistroGlicemiaRepository.excluir(id, usuario_id);
  }
}

export default new RegistroGlicemiaService();
