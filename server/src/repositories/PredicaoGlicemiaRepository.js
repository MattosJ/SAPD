import db from '../database/connection.js';

class PredicaoGlicemiaRepository {

  async salvar(dados) {
    const result = await db.query(
      `
      INSERT INTO predicoes_glicemia
      (usuario_id, glicemia_prevista, data_hora)
      VALUES ($1,$2,$3)
      RETURNING *
      `,
      [dados.usuarioId, dados.glicemia_prevista, dados.data_hora]
    );
    return result.rows[0];
  }

  async confirmar(id, usuarioId, glicemiaReal) {
    await db.query(
      `
      UPDATE predicoes_glicemia
      SET confirmada = true,
          glicemia_real = $1
      WHERE id = $2 AND usuario_id = $3
      `,
      [glicemiaReal, id, usuarioId]
    );
  }

  async listarPorUsuario(usuarioId) {
    const result = await db.query(
      `
      SELECT *
      FROM predicoes_glicemia
      WHERE usuario_id = $1
      ORDER BY data_hora DESC
      `,
      [usuarioId]
    );
    return result.rows;
  }
}

export default new PredicaoGlicemiaRepository();
