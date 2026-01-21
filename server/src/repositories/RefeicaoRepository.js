import db from '../database/connection.js';

class RefeicaoRepository {

  async criar(refeicao) {
    const result = await db.query(
      `
      INSERT INTO refeicoes (usuario_id, tipo, data_hora)
      VALUES ($1,$2,$3)
      RETURNING *
      `,
      [refeicao.usuarioId, refeicao.tipo, refeicao.data_hora]
    );
    return result.rows[0];
  }

  async adicionarAlimento(refeicaoId, alimentoId, quantidade) {
    await db.query(
      `
      INSERT INTO refeicao_alimentos
      (refeicao_id, alimento_id, quantidade)
      VALUES ($1,$2,$3)
      `,
      [refeicaoId, alimentoId, quantidade]
    );
  }

  async listarPorUsuario(usuarioId) {
    const result = await db.query(
      `
      SELECT * FROM refeicoes
      WHERE usuario_id = $1
      ORDER BY data_hora DESC
      `,
      [usuarioId]
    );
    return result.rows;
  }
}

export default new RefeicaoRepository();
