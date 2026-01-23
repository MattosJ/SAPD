import db from '../database/connection.js';

class LembreteRepository {

  async criar(dados) {
    const result = await db.query(
      `
      INSERT INTO lembretes (usuario_id, tipo, data_hora, observacoes)
      VALUES ($1, $2, $3, $4)
      RETURNING *
      `,
      [dados.usuarioId, dados.tipo, dados.data_hora, dados.observacoes]
    );
    return result.rows[0];
  }

  async listarPorUsuario(usuarioId) {
    const result = await db.query(
      `
      SELECT *
      FROM lembretes
      WHERE usuario_id = $1
      ORDER BY data_hora
      `,
      [usuarioId]
    );
    return result.rows;
  }

  async atualizar(id, usuarioId, dados) {
    await db.query(
      `
      UPDATE lembretes
      SET tipo = $1,
          data_hora = $2,
          observacoes = $3
      WHERE id = $4 AND usuario_id = $5
      `,
      [dados.tipo, dados.data_hora, dados.observacoes, id, usuarioId]
    );
  }

  async excluir(id, usuarioId) {
    await db.query(
      `
      DELETE FROM lembretes
      WHERE id = $1 AND usuario_id = $2
      `,
      [id, usuarioId]
    );
  }
}

export default new LembreteRepository();
