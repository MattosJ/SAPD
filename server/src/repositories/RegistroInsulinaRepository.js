import db from '../database/connection.js';


/**
 * Repository responsável pelo acesso e manipulação
 * dos registros de aplicação de insulina no banco de dados.
 * 
 * Camada responsável exclusivamente por operações SQL.
 */
class RegistroInsulinaRepository {


    /**
   * Cria um novo registro de aplicação de insulina
   *
   * @param {Object} dados - Dados do registro
   * @param {number} dados.usuario_id - ID do usuário
   * @param {number} dados.quantidade_insulina - Quantidade aplicada (UI)
   * @param {string} dados.tipo - Tipo de insulina
   * @param {string} dados.momento - Momento da aplicação (ex: pré-refeição)
   * @param {string} [dados.observacoes] - Observações adicionais
   *
   * @returns {Promise<Object>} Registro criado
   */
  async criar(dados) {
    const result = await db.query(
      `
      INSERT INTO registros_insulina
      (usuario_id, quantidade_insulina, tipo, data_hora, momento, observacoes)
      VALUES ($1,$2,$3,$4,$5,$6)
      RETURNING 
        id,
        usuario_id,
        quantidade_insulina,
        tipo,
        data_hora,
        momento,
        observacoes
      `,
      [
        dados.usuario_id,
        dados.quantidade_insulina,
        dados.tipo,
        new Date(),
        dados.momento,
        dados.observacoes
      ]
    );

    return result.rows[0];
  }


    /**
   * Lista todos registros de insulina de um usuário
   *
   * @param {number} usuario_id
   * @returns {Promise<Array<Object>>} Lista de registros
   */
  async listarPorUsuario(usuario_id) {
    const result = await db.query(
      `
      SELECT
        id,
        usuario_id,
        quantidade_insulina,
        tipo,
        data_hora,
        momento,
        observacoes
      FROM registros_insulina
      WHERE usuario_id = $1
      ORDER BY data_hora DESC
      `,
      [usuario_id]
    );

    return result.rows;
  }



    /**
   * Busca registro específico de insulina
   *
   * @param {number} id - ID do registro
   * @param {number} usuario_id - ID do usuário
   * @returns {Promise<Object|null>}
   */
  async buscarPorId(id, usuario_id) {
    const result = await db.query(
      `
      SELECT
        id,
        usuario_id,
        quantidade_insulina,
        tipo,
        data_hora,
        momento,
        observacoes
      FROM registros_insulina
      WHERE id = $1 AND usuario_id = $2
      `,
      [id, usuario_id]
    );

    return result.rows[0];
  }

    /**
   * Atualiza um registro de insulina
   *
   * @param {number} id
   * @param {number} usuario_id
   * @param {Object} dados
   * @param {number} dados.quantidade_insulina
   * @param {string} dados.tipo
   * @param {string} dados.momento
   * @param {string} dados.observacoes
   *
   * @returns {Promise<Object>}
   */

  async atualizar(id, usuario_id, dados) {
    
    const result = await db.query(
      `
      UPDATE registros_insulina
      SET quantidade_insulina = $1,
          tipo = $2,
          momento = $3,
          observacoes = $4
      WHERE id = $5 AND usuario_id = $6
      RETURNING
        id,
        usuario_id,
        quantidade_insulina,
        tipo,
        data_hora,
        momento,
        observacoes
      `,
      [
        dados.quantidade_insulina,
        dados.tipo,
        dados.momento,
        dados.observacoes,
        id,
        usuario_id
      ]
    );

    return result.rows[0];
  }


    /**
   * Remove um registro de insulina
   *
   * @param {number} id
   * @param {number} usuario_id
   * @returns {Promise<void>}
   */
  async excluir(id, usuario_id) {
    await db.query(
      `
      DELETE FROM registros_insulina
      WHERE id = $1 AND usuario_id = $2
      `,
      [id, usuario_id]
    );
  }
}

export default new RegistroInsulinaRepository();
