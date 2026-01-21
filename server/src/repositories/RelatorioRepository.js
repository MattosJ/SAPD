import db from '../database/connection.js';

class RelatorioRepository {

  async resumoGlicemia(usuarioId, dataInicio, dataFim) {
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
  }
}

export default new RelatorioRepository();
