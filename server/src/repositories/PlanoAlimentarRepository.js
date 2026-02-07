import db from '../database/connection.js';
/**
 * Classe responsável pela persistência dos dados relacionados
 * aos planos alimentares.
 *
 * Implementa o padrão Repository, isolando as operações de banco
 * de dados da lógica de negócio da aplicação.
 */

class PlanoAlimentarRepository {

    /**
   * Insere um novo plano alimentar no banco de dados.
   *
   * @param {Object} plano Dados do plano alimentar.
   * @param {number} plano.usuarioId ID do usuário dono do plano.
   * @param {string} plano.descricao Descrição do plano alimentar.
   * @param {Date} plano.data_inicio Data de início do plano.
   * @param {Date} plano.data_fim Data de término do plano.
   *
   * @returns {Object} Plano alimentar criado.
   */
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


  /**
   * Cria uma nova refeição associada a um plano alimentar.
   *
   * @param {number} planoId ID do plano alimentar.
   * @param {Object} refeicao Dados da refeição.
   * @param {string} refeicao.tipo Tipo da refeição (ex: café da manhã, almoço).
   * @param {string} refeicao.horario Horário da refeição.
   *
   * @returns {Object} Refeição criada.
   */
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


  /**
   * Adiciona um alimento a uma refeição do plano alimentar.
   *
   * @param {number} planoRefeicaoId ID da refeição do plano.
   * @param {Object} alimento Dados do alimento.
   * @param {number} alimento.alimento_id ID do alimento.
   * @param {number} alimento.quantidade Quantidade do alimento na refeição.
   */
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


  /**
   * Lista todos os planos alimentares de um usuário.
   *
   * Os planos são retornados ordenados pela data de início
   * do mais recente para o mais antigo.
   *
   * @param {number} usuarioId ID do usuário.
   *
   * @returns {Array<Object>} Lista de planos alimentares.
   */
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


    /**
    * Lista todas as refeições associadas a um plano alimentar.
     *
     * @param {number} planoId ID do plano alimentar.
     *
     * @returns {Array<Object>} Lista de refeições ordenadas por horário.
     */  
    async listarRefeicoes(planoId){
      const result = await db.query(`
          SELECT id, plano_id, tipo, horario 
          FROM plano_refeicoes
          WHERE plano_id = $1
          ORDER BY horario
      `, [planoId]);

      return result.rows;
    }
  


   /**
   * Lista todos os alimentos vinculados a uma refeição.
   *
   * Realiza uma junção (JOIN) entre as tabelas de alimentos
   * e a tabela de relacionamento entre refeições e alimentos,
   * retornando informações nutricionais e quantidade.
   *
   * @param {number} refeicaoId ID da refeição.
   *
   * @returns {Array<Object>} Lista de alimentos da refeição.
   */   
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



    /**
   * Remove um plano alimentar e todos os dados relacionados.
   *
   * A exclusão é feita manualmente para garantir integridade referencial,
   * seguindo a ordem:
   *
   * 1. Remove alimentos das refeições
   * 2. Remove refeições do plano
   * 3. Remove o plano alimentar
   *
   * @param {number} id ID do plano alimentar.
   * @param {number} usuario_id ID do usuário dono do plano.
   */
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
