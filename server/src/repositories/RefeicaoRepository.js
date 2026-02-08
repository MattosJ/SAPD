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

  // 1️ cria refeição
  const refeicaoResult = await db.query(
    `
    INSERT INTO refeicoes (usuario_id, tipo, data_hora)
    VALUES ($1, $2, $3)
    RETURNING *
    `,
    [dados.usuario_id, dados.refeicao.tipo, data]
  );

  const refeicaoCriada = refeicaoResult.rows[0];


  if (dados.refeicao.alimentos && Object.keys(dados.refeicao.alimentos).length > 0) {

    for (const [alimento_id, quantidade] of Object.entries(dados.refeicao.alimentos)) {
      await db.query(
        `
        INSERT INTO refeicao_alimentos
        (refeicao_id, alimento_id, quantidade)
        VALUES ($1, $2, $3)
        `,
        [refeicaoCriada.id, alimento_id, quantidade]
      );
    }
  }


  // 🔥 BUSCA COMPLETA COM JOIN
  const result = await db.query(`
    SELECT 
      r.id,
      r.tipo,
      r.data_hora,

      a.id AS alimento_id,
      a.nome,
      ra.quantidade,
      a.kcal,
      a.carboidratos,
      a.proteinas,
      a.gorduras

    FROM refeicoes r

    LEFT JOIN refeicao_alimentos ra
      ON ra.refeicao_id = r.id

    LEFT JOIN alimentos a
      ON a.id = ra.alimento_id

    WHERE r.id = $1
  `, [refeicaoCriada.id]);

    
  return result.rows;
}


  /**
   * Lista todas as refeições de um usuário, ordenadas da mais recente para a mais antiga.
   * @param {number} usuario_id - ID do usuário.
   * @returns {Promise<Array<Object>>} Lista de refeições do usuário.
   */
async listarPorUsuario(usuario_id) {
  const result = await db.query(`
    SELECT
      r.id AS refeicao_id,
      r.tipo,
      r.data_hora,

      a.id AS alimento_id,
      a.nome,
      a.kcal,
      a.carboidratos,
      a.proteinas,
      a.gorduras,

      ra.quantidade

    FROM refeicoes r
    LEFT JOIN refeicao_alimentos ra ON ra.refeicao_id = r.id
    LEFT JOIN alimentos a ON a.id = ra.alimento_id
    WHERE r.usuario_id = $1
    ORDER BY r.data_hora DESC
  `, [usuario_id]);

  // 🔥 Agrupar refeições
  const mapa = {};

  for (const row of result.rows) {

    if (!mapa[row.refeicao_id]) {
      mapa[row.refeicao_id] = {
        id: row.refeicao_id,
        tipo: row.tipo,
        data_hora: row.data_hora,
        alimentos: []
      };
    }

    // se existir alimento
    if (row.alimento_id) {
      mapa[row.refeicao_id].alimentos.push({
        id: row.alimento_id,
        nome: row.nome,
        quantidade: row.quantidade,
        kcal: row.kcal,
        carboidratos: row.carboidratos,
        proteinas: row.proteinas,
        gorduras: row.gorduras
      });
    }
  }

  return Object.values(mapa);
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