import db from '../database/connection.js';

/**
 * Repositório para manipulação de registros de glicemia no banco de dados.
 * Fornece métodos para criar, buscar, atualizar e excluir registros,
 * além de buscar medições recentes e previsões de glicemia.
 */
class RegistroGlicemiaRepository {

  /**
   * Cria um novo registro de glicemia.
   * @param {Object} dados - Dados do registro de glicemia.
   * @param {number} dados.valor - Valor da glicemia.
   * @param {string} dados.data_hora - Data e hora do registro (ISO string).
   * @param {string} dados.momento - Momento do dia (ex: "jejum", "pós-refeição").
   * @param {string} [dados.observacao] - Observações adicionais.
   * @param {number} dados.usuario_id - ID do usuário dono do registro.
   * @returns {Promise<Object>} O registro recém-criado.
   */
  async criar(dados) {
    const result = await db.query(
      `
      INSERT INTO registros_glicemia
      (valor, data_hora, momento, observacao, usuario_id)
      VALUES ($1,$2,$3,$4,$5)
      RETURNING *
      `,
      [
        dados.valor,
        dados.data_hora,
        dados.momento,
        dados.observacao,
        dados.usuario_id
      ]
    );

    return result.rows[0];
  }

  /**
   * Busca todas as medições de um usuário.
   * Retorna a data formatada e o valor da glicemia.
   * @param {number} usuarioId - ID do usuário.
   * @returns {Promise<Array<{data: string, valor: number}>>} Lista de medições.
   */
  async buscarMedicoes(usuarioId) {
    const result = await db.query(`
      SELECT 
        TO_CHAR(data_hora, 'DD/MM') AS data,
        valor
      FROM registros_glicemia
      WHERE usuario_id = $1
      ORDER BY data_hora
    `, [usuarioId]);

    return result.rows;
  }

  /**
   * Busca os últimos 3 registros de glicemia de um usuário.
   * @param {number} usuarioId - ID do usuário.
   * @returns {Promise<Array<{data: string, hora: string, valor: number}>>} Lista dos últimos registros.
   */
  async buscarUltimosRegistros(usuarioId) {
    const result = await db.query(`
      SELECT 
        TO_CHAR(data_hora, 'DD/MM') AS data,
        TO_CHAR(data_hora, 'HH24:MI') AS hora,
        valor
      FROM registros_glicemia
      WHERE usuario_id = $1
      ORDER BY data_hora DESC
      LIMIT 3
    `, [usuarioId]);

    return result.rows;
  }

  /**
   * Busca um registro pelo ID, garantindo que pertença ao usuário.
   * @param {number} id - ID do registro.
   * @param {number} usuario_id - ID do usuário.
   * @returns {Promise<Object|null>} Registro encontrado ou null se não existir.
   */
  async buscarPorId(id, usuario_id) {
    const result = await db.query(
      `
      SELECT * FROM registros_glicemia
      WHERE id = $1 AND usuario_id = $2
      `,
      [id, usuario_id]
    );
    return result.rows[0];
  }

  /**
   * Busca registros dentro de um período específico.
   * @param {number} usuarioId - ID do usuário.
   * @param {number} dias - Quantidade de dias anteriores a partir de hoje.
   * @returns {Promise<Array<{valor: number, data_hora: string}>>} Lista de registros.
   */
  async buscarPorPeriodo(usuarioId, dias) {
    const result = await db.query(`
      SELECT valor, data_hora
      FROM registros_glicemia
      WHERE usuario_id = $1
      AND data_hora >= NOW() - INTERVAL '${dias} days'
      ORDER BY data_hora
    `, [usuarioId]);

    return result.rows;
  }

  /**
   * Busca os últimos 3 registros de glicemia de um usuário (similar a buscarUltimosRegistros).
   * @param {number} usuarioId - ID do usuário.
   * @returns {Promise<Array<{id: number, valor: number, data_hora: string}>>} Últimos registros.
   */
  async ultimosRegistros(usuarioId) {
    const result = await db.query(`
      SELECT id, valor, data_hora
      FROM registros_glicemia
      WHERE usuario_id = $1
      ORDER BY data_hora DESC
      LIMIT 3
    `, [usuarioId]);

    return result.rows;
  }

  /**
   * Busca previsões de glicemia de um usuário em um período específico.
   * @param {number} usuarioId - ID do usuário.
   * @param {number} dias - Quantidade de dias anteriores a partir de hoje.
   * @returns {Promise<Array<Object>>} Lista de previsões de glicemia.
   */
  async predicoes(usuarioId, dias) {
    const result = await db.query(`
      SELECT *
      FROM predicoes_glicemia
      WHERE usuario_id = $1
      AND data_hora >= NOW() - INTERVAL '${dias} days'
      ORDER BY data_hora
    `, [usuarioId]);

    return result.rows;
  }

  /**
   * Atualiza um registro de glicemia existente.
   * @param {number} id - ID do registro.
   * @param {number} usuario_id - ID do usuário dono do registro.
   * @param {Object} dados - Novos dados do registro.
   * @param {number} dados.valor - Valor da glicemia.
   * @param {string} dados.data_hora - Data e hora do registro.
   * @param {string} dados.momento - Momento do dia.
   * @param {string} [dados.observacao] - Observações adicionais.
   * @returns {Promise<Object|null>} Registro atualizado ou null se não encontrado.
   */
  async atualizar(id, usuario_id, dados) {
    const result = await db.query(
      `
      UPDATE registros_glicemia
      SET valor = $1,
          data_hora = $2,
          momento = $3,
          observacao = $4
      WHERE id = $5 AND usuario_id = $6
      RETURNING *
      `,
      [
        dados.valor,
        dados.data_hora,
        dados.momento,
        dados.observacao,
        id,
        usuario_id
      ]
    );

    return result.rows[0];
  }

  /**
   * Exclui um registro de glicemia de um usuário.
   * @param {number} id - ID do registro.
   * @param {number} usuario_id - ID do usuário dono do registro.
   * @returns {Promise<void>}
   */
  async excluir(id, usuario_id) {
    await db.query(
      `
      DELETE FROM registros_glicemia
      WHERE id = $1 AND usuario_id = $2
      `,
      [id, usuario_id]
    );
  }
}

export default new RegistroGlicemiaRepository();
