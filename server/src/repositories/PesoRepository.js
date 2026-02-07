import db from '../database/connection.js';

/**
 * Repositório para manipulação de registros de peso de usuários.
 * Permite criar registros de peso vinculados a um usuário.
 */
class PesoRepository {

  /**
   * Cria um novo registro de peso para um usuário.
   * @param {number} usuario_id - ID do usuário.
   * @param {number} peso - Valor do peso do usuário.
   * @returns {Promise<Object>} Registro de peso recém-criado.
   */
  async criar(usuario_id, peso) {
    const result = await db.query(`
      INSERT INTO registros_peso (usuario_id, peso)
      VALUES ($1,$2)
      RETURNING *
    `, [usuario_id, peso]);

    return result.rows[0];
  }

}

export default new PesoRepository();
