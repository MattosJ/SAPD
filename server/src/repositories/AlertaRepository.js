import db from '../database/connection.js';

class AlertaRepository {

  //Adiciona um novo alerta ao banco
  async criar(alerta) {
    const result = await db.query(
      `
      INSERT INTO alertas (usuario_id, tipo, mensagem, nivel)
      VALUES ($1,$2,$3,$4)
      RETURNING *
      `,
      [
        alerta.usuarioId,
        alerta.tipo,
        alerta.mensagem,
        alerta.nivel
      ]
    );
    return result.rows[0];
  }

  //Busca todos alertas de um usuario no banco de dados
  async listar(usuarioId) {
    const result = await db.query(
      `
      SELECT *
      FROM alertas
      WHERE usuario_id = $1
      ORDER BY created_at DESC
      `,
      [usuarioId]
    );
    return result.rows;
  }

  //Marca um alerta especifico como lido
  async marcarComoLido(id, usuarioId) {
    await db.query(
      `
      UPDATE alertas
      SET lido = true
      WHERE id = $1 AND usuario_id = $2
      `,
      [id, usuarioId]
    );
  }
}

export default new AlertaRepository();
