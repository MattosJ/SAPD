import db from '../database/connection.js';

class RefeicaoRepository {

  async criar(dados) {

        // cria refeição
        const refeicao = await db.query(
          `
          INSERT INTO refeicoes (usuario_id, tipo, data_hora)
          VALUES ($1,$2,$3)
          RETURNING *
          `,
          [dados.usuario_id, dados.tipo, dados.data_hora]
        );

        const refeicaoCriada = refeicao.rows[0];


        if (dados.alimentos && dados.alimentos.length > 0) {
          for (const alimento of dados.alimentos) {

            await db.query(
              `
              INSERT INTO refeicao_alimentos
              (refeicao_id, alimento_id, quantidade)
              VALUES ($1,$2,$3)
              `,
              [
                refeicaoCriada.id,
                alimento.id,
                alimento.quantidade
              ]
            );

          }

        }

        return refeicaoCriada;
  }

  async listarPorUsuario(usuario_id) {
    const r = await db.query(
      `SELECT * FROM refeicoes WHERE usuario_id=$1 ORDER BY data_hora DESC`,
      [usuario_id]
    );
    return r.rows;
  }

  async excluir(id, usuario_id) {
    await db.query(
      `DELETE FROM refeicoes WHERE id=$1 AND usuario_id=$2`,
      [id, usuario_id]
    );
  }
}

export default new RefeicaoRepository();
