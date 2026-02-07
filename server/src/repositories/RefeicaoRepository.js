import db from '../database/connection.js';

/**
 * Repositório para manipulação de refeições.
 * Permite criar, listar e excluir refeições, incluindo a associação de alimentos.
 */
class RefeicaoRepository {

  /**
   * Cria uma nova refeição para o usuário.
   * Se forem fornecidos alimentos, eles também são inseridos na tabela `refeicao_alimentos`.
   * @param {Object} dados - Dados da refeição.
   * @param {number} dados.usuario_id - ID do usuário dono da refeição.
   * @param {Object} dados.refeicao - Dados da refeição.
   * @param {string} dados.refeicao.tipo - Tipo da refeição (ex: "Café da manhã", "Almoço").
   * @param {Object} [dados.refeicao.alimentos] - Objeto com pares alimento_id: quantidade.
   * @returns {Promise<Object>} Refeição recém-criada.
   */
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

    // adiciona alimentos, se fornecidos
    if (dados.refeicao.alimentos && Object.keys(dados.refeicao.alimentos).length > 0) {
      Object.entries(dados.refeicao.alimentos).forEach(async ([alimento_id, quantidade]) => {
        await db.query(
          `
          INSERT INTO refeicao_alimentos
          (refeicao_id, alimento_id, quantidade)
          VALUES ($1,$2,$3)
          `,
          [refeicaoCriada.id, alimento_id, quantidade]
        );
      });
    }

    return refeicaoCriada;
  }

  /**
   * Lista todas as refeições de um usuário, ordenadas da mais recente para a mais antiga.
   * @param {number} usuario_id - ID do usuário.
   * @returns {Promise<Array<Object>>} Lista de refeições do usuário.
   */
  async listarPorUsuario(usuario_id) {
    const r = await db.query(
      `SELECT * FROM refeicoes WHERE usuario_id=$1 ORDER BY data_hora DESC`,
      [usuario_id]
    );
    return r.rows;
  }

  /**
   * Exclui uma refeição de um usuário pelo ID.
   * @param {number} id - ID da refeição.
   * @param {number} usuario_id - ID do usuário dono da refeição.
   * @returns {Promise<void>}
   */
  async excluir(id, usuario_id) {
    await db.query(
      `DELETE FROM refeicoes WHERE id=$1 AND usuario_id=$2`,
      [id, usuario_id]
    );
  }
}

export default new RefeicaoRepository();
