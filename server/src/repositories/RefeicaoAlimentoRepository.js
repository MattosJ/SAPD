import db from '../database/connection.js';

/**
 * Repositório para manipulação da relação entre refeições e alimentos.
 * Permite adicionar alimentos a refeições, listar e remover.
 */
class RefeicaoAlimentoRepository {

  /**
   * Adiciona um alimento a uma refeição.
   * @param {Object} param0
   * @param {number} param0.refeicao_id - ID da refeição.
   * @param {number} param0.alimento_id - ID do alimento.
   * @param {number} param0.quantidade - Quantidade do alimento na refeição.
   * @returns {Promise<Object>} Registro recém-criado com id, refeicao_id, alimento_id e quantidade.
   */
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

  /**
   * Lista todos os alimentos de uma refeição.
   * Inclui informações detalhadas do alimento (nome, kcal, carboidratos, proteínas, gorduras) e a quantidade na refeição.
   * @param {number} refeicao_id - ID da refeição.
   * @returns {Promise<Array<Object>>} Lista de alimentos da refeição.
   */
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

  /**
   * Remove um alimento de uma refeição pelo ID do registro na tabela refeicao_alimentos.
   * @param {number} id - ID do registro a ser removido.
   * @returns {Promise<void>}
   */
  async remover(id) {
    await db.query(
      `DELETE FROM refeicao_alimentos WHERE id = $1`,
      [id]
    );
  }
}

export default new RefeicaoAlimentoRepository();
