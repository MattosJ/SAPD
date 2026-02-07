import db from '../database/connection.js';

/**
 * Repository responsável pelo acesso aos dados
 * relacionados às predições de glicemia.
 * 
 * Essa camada executa apenas operações no banco de dados,
 * sem conter regras de negócio.
 */
class PredicaoGlicemiaRepository {

  /**
   * Salva uma nova predição de glicemia no banco de dados
   *
   * @param {Object} dados - Dados da predição
   * @returns {Object} Predição criada
   */
  async salvar(dados) {
    const result = await db.query(
      `
      INSERT INTO predicoes_glicemia
      (usuario_id, glicemia_prevista, data_hora)
      VALUES ($1,$2,$3)
      RETURNING *
      `,
      [dados.usuarioId, dados.glicemia_prevista, dados.data_hora]
    );

    // Retorna a predição recém criada
    return result.rows[0];
  }

  /**
   * Confirma uma predição registrando o valor real medido
   *
   * @param {number} id - Identificador da predição
   * @param {number} usuarioId - Identificador do usuário
   * @param {number} glicemiaReal - Valor real medido pelo usuário
   */
  async confirmar(id, usuarioId, glicemiaReal) {
    await db.query(
      `
      UPDATE predicoes_glicemia
      SET confirmada = true,
          glicemia_real = $1
      WHERE id = $2 AND usuario_id = $3
      `,
      [glicemiaReal, id, usuarioId]
    );
  }

  /**
   * Lista todas as predições de glicemia do usuário
   *
   * @param {number} usuarioId - Identificador do usuário
   * @returns {Array} Lista de predições ordenadas pela data
   */
  async listarPorUsuario(usuarioId) {
    const result = await db.query(
      `
      SELECT *
      FROM predicoes_glicemia
      WHERE usuario_id = $1
      ORDER BY data_hora DESC
      `,
      [usuarioId]
    );

    return result.rows;
  }
}

export default new PredicaoGlicemiaRepository();
