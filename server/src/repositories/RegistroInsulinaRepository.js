import db from '../database/connection.js';

class RegistroInsulinaRepository {

  async criar(dados) {
    const result = await db.query(
      `
      INSERT INTO registros_insulina
      (usuario_id, quantidade_insulina, tipo, data_hora, momento, observacoes)
      VALUES ($1,$2,$3,$4,$5,$6)
      RETURNING *
      `,
      [
        dados.usuarioId,
        dados.quantidade_insulina,
        dados.tipo,
        dados.data_hora,
        dados.momento,
        dados.observacoes
      ]
    );

    return result.rows[0];
  }

  async listarPorUsuario(usuarioId) {
    const result = await db.query(
      `
      SELECT *
      FROM registros_insulina
      WHERE usuario_id = $1
      ORDER BY data_hora DESC
      `,
      [usuarioId]
    );

    return result.rows;
  }

  async excluir(id, usuarioId) {
    await db.query(
      `
      DELETE FROM registros_insulina
      WHERE id = $1 AND usuario_id = $2
      `,
      [id, usuarioId]
    );
  }
}

export default new RegistroInsulinaRepository();
