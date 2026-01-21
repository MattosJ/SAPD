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
}

export default new PlanoAlimentarRepository();
