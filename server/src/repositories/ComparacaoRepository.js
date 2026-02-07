import db from '../database/connection.js';

/**
 * Repository responsável por acessar os dados relacionados
 * à comparação entre plano alimentar e consumo real do usuário.
 * 
 * Essa camada realiza consultas SQL e retorna dados já agregados.
 */
class ComparacaoRepository {

  /**
   * Calcula os valores nutricionais previstos no plano alimentar
   * dentro de um intervalo de datas.
   *
   * @param {number} usuarioId - Identificador do usuário
   * @param {string} dataInicio - Data inicial do período
   * @param {string} dataFim - Data final do período
   * @returns {Object} Soma dos macronutrientes planejados
   */
  async plano(usuarioId, dataInicio, dataFim) {

    const result = await db.query(
      `
      SELECT
        SUM(a.kcal * pra.quantidade / 100) AS kcal,
        SUM(a.carboidratos * pra.quantidade / 100) AS carboidratos,
        SUM(a.proteinas * pra.quantidade / 100) AS proteinas,
        SUM(a.gorduras * pra.quantidade / 100) AS gorduras
      FROM planos_alimentares p
      JOIN plano_refeicoes pr ON pr.plano_id = p.id
      JOIN plano_refeicao_alimentos pra ON pra.plano_refeicao_id = pr.id
      JOIN alimentos a ON a.id = pra.alimento_id
      WHERE p.usuario_id = $1
        AND p.data_inicio <= $3
        AND p.data_fim >= $2
      `,
      [usuarioId, dataInicio, dataFim]
    );

    // Retorna os valores nutricionais totais do plano alimentar
    return result.rows[0];
  }

  /**
   * Calcula os valores nutricionais consumidos pelo usuário
   * com base nas refeições registradas.
   *
   * @param {number} usuarioId - Identificador do usuário
   * @param {string} dataInicio - Data inicial do período
   * @param {string} dataFim - Data final do período
   * @returns {Object} Soma dos macronutrientes consumidos
   */
  async consumo(usuarioId, dataInicio, dataFim) {

    const result = await db.query(
      `
      SELECT
        SUM(a.kcal * ra.quantidade / 100) AS kcal,
        SUM(a.carboidratos * ra.quantidade / 100) AS carboidratos,
        SUM(a.proteinas * ra.quantidade / 100) AS proteinas,
        SUM(a.gorduras * ra.quantidade / 100) AS gorduras
      FROM refeicoes r
      JOIN refeicao_alimentos ra ON ra.refeicao_id = r.id
      JOIN alimentos a ON a.id = ra.alimento_id
      WHERE r.usuario_id = $1
        AND r.data_hora BETWEEN $2 AND $3
      `,
      [usuarioId, dataInicio, dataFim]
    );

    // Retorna os valores nutricionais totais consumidos pelo usuário
    return result.rows[0];
  }
}

export default new ComparacaoRepository();
