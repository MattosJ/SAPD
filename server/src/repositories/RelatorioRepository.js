import db from '../database/connection.js';

class RelatorioRepository {

  /**
   * Obtém dados de glicemia para construção de gráfico.
   *
   * @param {number} usuarioId - ID do usuário
   * @returns {Promise<Array<{data: string, valor: number}>>}
   */
  async glicemiaGrafico(usuarioId) {
    const result = await db.query(`
      SELECT
        TO_CHAR(data_hora, 'DD/MM') AS data,
        valor
      FROM registros_glicemia
      WHERE usuario_id = $1
      ORDER BY data_hora
    `, [usuarioId]);

    return result.rows;
  }

  /**
   * Obtém dados de peso para construção de gráfico.
   *
   * @param {number} usuarioId - ID do usuário
   * @returns {Promise<Array<{data: string, valor: number}>>}
   */
  async pesoGrafico(usuarioId) {
    const result = await db.query(`
      SELECT
        TO_CHAR(data_hora, 'DD/MM') AS data,
        peso AS valor
      FROM registros_peso
      WHERE usuario_id = $1
      ORDER BY data_hora
    `, [usuarioId]);

    return result.rows;
  }

  /**
   * Retorna relatório semanal de calorias consumidas nas refeições.
   *
   * @param {number} usuarioId - ID do usuário
   * @returns {Promise<Array<Object>>} Lista de relatórios semanais
   */
  async relatorioRefeicoes(usuarioId) {
    const result = await db.query(`
      SELECT
        DATE_TRUNC('week', r.data_hora) AS semana,
        SUM(a.kcal * ra.quantidade) AS total_calorias,
        JSON_AGG(
          JSON_BUILD_OBJECT(
            'calorias', (a.kcal * ra.quantidade),
            'data', TO_CHAR(r.data_hora, 'DD/MM')
          )
        ) AS medicoes
      FROM refeicoes r
      JOIN refeicao_alimentos ra ON ra.refeicao_id = r.id
      JOIN alimentos a ON a.id = ra.alimento_id
      WHERE r.usuario_id = $1
      GROUP BY semana
      ORDER BY semana DESC
    `, [usuarioId]);

    return result.rows.map((row, index) => ({
      nome: `Semana ${index + 1}`,
      dataInicio: row.semana,
      dataFim: new Date(
        new Date(row.semana).setDate(new Date(row.semana).getDate() + 6)
      ),
      totalCalorias: Number(row.total_calorias),
      medicoes: row.medicoes
    }));
  }

  /**
   * Retorna relatório semanal de evolução do peso.
   *
   * @param {number} usuarioId - ID do usuário
   * @returns {Promise<Array<Object>>} Lista de relatórios semanais
   */
  async relatorioPeso(usuarioId) {
    const result = await db.query(`
      SELECT
        DATE_TRUNC('week', data_hora) AS semana,
        COALESCE(
          JSON_AGG(
            JSON_BUILD_OBJECT(
              'valor', peso,
              'data', TO_CHAR(data_hora, 'DD/MM')
            )
          ),
          '[]'
        ) AS medicoes
      FROM registros_peso
      WHERE usuario_id = $1
      GROUP BY semana
      ORDER BY semana DESC
    `, [usuarioId]);

    return result.rows.map((row, index) => ({
      nome: `Semana ${index + 1}`,
      dataInicio: row.semana,
      dataFim: new Date(
        new Date(row.semana).setDate(new Date(row.semana).getDate() + 6)
      ),
      medicoes: row.medicoes
    }));
  }

  /**
   * Obtém registros de glicemia filtrados por período.
   *
   * @param {number} usuarioId - ID do usuário
   * @param {'mes'|'meses'|'ano'} tipo - Intervalo de tempo
   * @returns {Promise<Array<{name: string, valor: number}>>}
   */
  async glicemiaPorTempo(usuarioId, tipo) {
    let intervalo = '1 year';
    if (tipo === 'mes') intervalo = '1 month';
    if (tipo === 'meses') intervalo = '3 months';

    const result = await db.query(`
      SELECT
        TO_CHAR(data_hora, 'DD/MM') AS name,
        valor
      FROM registros_glicemia
      WHERE usuario_id = $1
        AND data_hora >= NOW() - INTERVAL '${intervalo}'
      ORDER BY data_hora
    `, [usuarioId]);

    return result.rows;
  }

  /**
   * Obtém registros de peso filtrados por período.
   *
   * @param {number} usuarioId - ID do usuário
   * @param {'mes'|'meses'|'ano'} tipo - Intervalo de tempo
   * @returns {Promise<Array<{name: string, valor: number}>>}
   */
  async pesoPorTempo(usuarioId, tipo) {
    let intervalo = '1 year';
    if (tipo === 'mes') intervalo = '1 month';
    if (tipo === 'meses') intervalo = '3 months';

    const result = await db.query(`
      SELECT
        TO_CHAR(data_hora, 'DD/MM') AS name,
        peso AS valor
      FROM registros_peso
      WHERE usuario_id = $1
        AND data_hora >= NOW() - INTERVAL '${intervalo}'
      ORDER BY data_hora
    `, [usuarioId]);

    return result.rows;
  }
}

export default new RelatorioRepository();
