import db from '../database/connection.js';

class PlanoAlimentarRepository {

  async criarPlano(plano) {
    const result = await db.query(
      `
      INSERT INTO planos_alimentares
      (usuario_id, descricao, data_inicio, data_fim)
      VALUES ($1,$2,$3,$4)
      RETURNING *
      `,
      [plano.usuarioId, plano.descricao, plano.data_inicio, plano.data_fim]
    );
    return result.rows[0];
  }

  async criarRefeicao(planoId, refeicao) {
    const result = await db.query(
      `
      INSERT INTO plano_refeicoes (plano_id, tipo, horario)
      VALUES ($1,$2,$3)
      RETURNING *
      `,
      [planoId, refeicao.tipo, refeicao.horario]
    );
    return result.rows[0];
  }

  async adicionarAlimento(planoRefeicaoId, alimento) {
    await db.query(
      `
      INSERT INTO plano_refeicao_alimentos
      (plano_refeicao_id, alimento_id, quantidade)
      VALUES ($1,$2,$3)
      `,
      [planoRefeicaoId, alimento.alimento_id, alimento.quantidade]
    );
  }

  async listarPorUsuario(usuarioId) {
    const result = await db.query(
      `
      SELECT * FROM planos_alimentares
      WHERE usuario_id = $1
      ORDER BY data_inicio DESC
      `,
      [usuarioId]
    );
    return result.rows;
  }
    async listarRefeicoes(planoId){
      const result = await db.query(`
          SELECT id, plano_id, tipo, horario 
          FROM plano_refeicoes
          WHERE plano_id = $1
          ORDER BY horario
      `, [planoId]);

      return result.rows;
    }
  
async listarAlimentosDaRefeicao(refeicaoId) {
  const result = await db.query(`
    SELECT
      a.id,
      a.nome,
      a.kcal,
      pra.quantidade
    FROM plano_refeicao_alimentos pra
    JOIN alimentos a ON a.id = pra.alimento_id
    WHERE pra.plano_refeicao_id = $1
  `, [refeicaoId]);

  return result.rows;
}
      async excluir(id, usuario_id) {

        await db.query(
          `DELETE FROM plano_refeicao_alimentos
          WHERE plano_refeicao_id IN (
              SELECT id FROM plano_refeicoes WHERE plano_id = $1
          )`,
          [id]
        );

        await db.query(
          `DELETE FROM plano_refeicoes
          WHERE plano_id = $1`,
          [id]
        );

        await db.query(
          `DELETE FROM planos_alimentares
          WHERE id = $1 AND usuario_id = $2`,
          [id, usuario_id]
        );
      }


}

export default new PlanoAlimentarRepository();
