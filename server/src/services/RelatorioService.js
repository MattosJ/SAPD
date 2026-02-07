import RelatorioRepository from '../repositories/RelatorioRepository.js';

/**
 * Separa uma data/hora em objetos formatados para exibição.
 *
 * @param {Date|string} dataHora - Data e hora original
 * @returns {{data: string, hora: string}}
 */
function separarDataHora(dataHora) {
  const d = new Date(dataHora);

  return {
    data: d.toLocaleDateString('pt-BR', {
      day: '2-digit',
      month: '2-digit',
    }),
    hora: d.toLocaleTimeString('pt-BR', {
      hour: '2-digit',
      minute: '2-digit',
    }),
  };
}

class RelatorioService {

  /**
   * Busca todos os dados principais para montagem do dashboard de relatórios.
   *
   * Reúne:
   * - Dados de glicemia para gráfico
   * - Dados de peso para gráfico
   * - Relatórios semanais de refeições
   * - Relatórios semanais de evolução do peso
   *
   * Também realiza formatação de datas para exibição.
   *
   * @param {number} usuarioId - ID do usuário autenticado
   * @returns {Promise<{
   *   glicemia: Array<{data: string, valor: number}>,
   *   peso: Array<{data: string, valor: number}>,
   *   relatoriosRefeicao: Array<Object>,
   *   relatoriosPeso: Array<Object>
   * }>}
   */
  async buscarPrincipal(usuarioId) {

    const glicemia =
      await RelatorioRepository.glicemiaGrafico(usuarioId);

    const peso =
      await RelatorioRepository.pesoGrafico(usuarioId);

    const relatoriosRefeicaoRaw =
      await RelatorioRepository.relatorioRefeicoes(usuarioId);

    const relatoriosPesoRaw =
      await RelatorioRepository.relatorioPeso(usuarioId);

    const relatoriosRefeicao = relatoriosRefeicaoRaw.map((relatorio) => {
      const inicio = separarDataHora(relatorio.dataInicio);
      const fim = separarDataHora(relatorio.dataFim);

      return {
        ...relatorio,
        dataInicio: inicio.data,
        horaInicio: inicio.hora,
        dataFim: fim.data,
        horaFim: fim.hora,
      };
    });

    const relatoriosPeso = relatoriosPesoRaw.map((relatorio) => {
      const inicio = separarDataHora(relatorio.dataInicio);
      const fim = separarDataHora(relatorio.dataFim);

      return {
        ...relatorio,
        dataInicio: inicio.data,
        horaInicio: inicio.hora,
        dataFim: fim.data,
        horaFim: fim.hora,
      };
    });

    return {
      glicemia,
      peso,
      relatoriosRefeicao,
      relatoriosPeso,
    };
  }

  /**
   * Busca dados de glicemia e peso filtrados por intervalo de tempo.
   *
   * Intervalos disponíveis:
   * - dia
   * - mes
   * - meses (últimos 3 meses)
   * - ano
   *
   * @param {number} usuarioId - ID do usuário autenticado
   * @param {'dia'|'mes'|'meses'|'ano'} tipoSelecao - Tipo de filtro temporal
   * @returns {Promise<{
   *   glicemia: Array<{name: string, valor: number}>,
   *   peso: Array<{name: string, valor: number}>
   * }>}
   */
  async buscarPorTempo(usuarioId, tipoSelecao) {

    const glicemia =
      await RelatorioRepository.glicemiaPorTempo(usuarioId, tipoSelecao);

    const peso =
      await RelatorioRepository.pesoPorTempo(usuarioId, tipoSelecao);

    return { glicemia, peso };
  }
}

export default new RelatorioService();
