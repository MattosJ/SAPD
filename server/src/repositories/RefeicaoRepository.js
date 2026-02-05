import db from '../database/connection.js';

class RefeicaoRepository {

  async criar(dados) {
        const data = new Date();
        // cria refeição
        const refeicao = await db.query(
          `
          INSERT INTO refeicoes (usuario_id, tipo, data_hora)
          VALUES ($1,$2,$3)
          RETURNING *
          `,
          [dados.usuario_id, dados.refeicao.tipo, data]
        );

        const refeicaoCriada = refeicao.rows[0];


        if (dados.refeicao.alimentos && dados.refeicao.alimentos.length > 0) {
          Object.entries(dados.refeicao.alimentos).forEach(async ([key, value]) => {
            

              await db.query(
                `
                INSERT INTO refeicao_alimentos
                (refeicao_id, alimento_id, quantidade)
                VALUES ($1,$2,$3)
                `,
                [
                  refeicaoCriada.id,
                  key,
                  value
                ]
              );

            }
          );
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
