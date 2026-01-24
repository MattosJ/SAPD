import db from '../database/connection.js';

class RefeicaoAlimentoRepository {

  async adicionar({ refeicao_id, alimento_id, quantidade }) {
    const r = await db.query(
      `
      INSERT INTO refeicao_alimentos
      (refeicao_id, alimento_id, quantidade)
      VALUES ($1,$2,$3)
      RETURNING *
      `,
      [refeicao_id, alimento_id, quantidade]
    );
    return r.rows[0];
  }

  async listarPorRefeicao(refeicao_id) {
    const r = await db.query(
      `
      SELECT 
        ra.id,
        a.nome,
        a.kcal,
        a.carboidratos,
        a.proteinas,
        a.gorduras,
        ra.quantidade
      FROM refeicao_alimentos ra
      JOIN alimentos a ON a.id = ra.alimento_id
      WHERE ra.refeicao_id = $1
      `,
      [refeicao_id]
    );
    return r.rows;
  }

  async remover(id) {
    await db.query(
      `DELETE FROM refeicao_alimentos WHERE id = $1`,
      [id]
    );
  }
}

export default new RefeicaoAlimentoRepository();
