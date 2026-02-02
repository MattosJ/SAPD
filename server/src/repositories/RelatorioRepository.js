import db from '../database/connection.js';

class RelatorioRepository {

  /* ======================
     GLICEMIA – GRÁFICO
  ====================== */
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

  /* ======================
     PESO – GRÁFICO
  ====================== */
  async pesoGrafico(usuarioId) {
    const result = await db.query(`
      SELECT
        TO_CHAR(updated_at, 'DD/MM') AS data,
        peso AS valor
      FROM usuarios
      WHERE id = $1
    `, [usuarioId]);

    return result.rows;
  }

  /* ======================
     RELATÓRIO DE REFEIÇÕES
  ====================== */
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

  /* ======================
     RELATÓRIO DE PESO
  ====================== */
  async relatorioPeso(usuarioId) {
    const result = await db.query(`
      SELECT
        DATE_TRUNC('week', created_at) AS semana,
        JSON_AGG(
          JSON_BUILD_OBJECT(
            'valor', peso,
            'data', TO_CHAR(created_at, 'DD/MM')
          )
        ) AS medicoes
      FROM usuarios
      WHERE id = $1
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

  /* ======================
     FILTRO POR TEMPO
  ====================== */
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

  async pesoPorTempo(usuarioId, tipo) {
    let intervalo = '1 year';
    if (tipo === 'mes') intervalo = '1 month';
    if (tipo === 'meses') intervalo = '3 months';

    const result = await db.query(`
      SELECT
        TO_CHAR(updated_at, 'DD/MM') AS name,
        peso AS valor
      FROM usuarios
      WHERE id = $1
    `, [usuarioId]);

    return result.rows;
  }




 /*sync resumoGlicemia(usuarioId, dataInicio, dataFim) {
    const result = await db.query(
      `
      SELECT
        COUNT(*) AS total_medicoes,
        AVG(valor) AS media,
        MIN(valor) AS minimo,
        MAX(valor) AS maximo
      FROM registros_glicemia
      WHERE usuario_id = $1
        AND data_hora BETWEEN $2 AND $3
      `,
      [usuarioId, dataInicio, dataFim]
    );

    return result.rows[0];
  }

  async listarMedicoes(usuarioId, dataInicio, dataFim) {
    const result = await db.query(
      `
      SELECT valor, data_hora
      FROM registros_glicemia
      WHERE usuario_id = $1
        AND data_hora BETWEEN $2 AND $3
      ORDER BY data_hora
      `,
      [usuarioId, dataInicio, dataFim]
    );

    return result.rows;
  }*/
}

export default new RelatorioRepository();
