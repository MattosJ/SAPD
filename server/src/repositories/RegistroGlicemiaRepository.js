import db from '../database/connection.js';

class RegistroGlicemiaRepository {

  async salvar(registro) {
    const result = await db.query(
      `INSERT INTO registros_glicemia
       (valor, data_hora, momento, observacao, usuario_id)
       VALUES ($1, $2, $3, $4, $5)
       RETURNING *`,
      [
        registro.valor,
        registro.dataHora,
        registro.momento,
        registro.observacao,
        registro.usuarioId
      ]
    );

    return result.rows[0];
  }

  async listarPorUsuario(usuarioId) {
    const result = await db.query(
      `SELECT * FROM registros_glicemia
       WHERE usuario_id = $1
       ORDER BY data_hora DESC`,
      [usuarioId]
    );

    return result.rows;
  }
}

export default new RegistroGlicemiaRepository();
