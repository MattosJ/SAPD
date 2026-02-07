import db from '../database/connection.js';

/**
 * Repository responsável pela persistência dos dados
 * relacionados aos alimentos.
 *
 * Implementa operações de criação, leitura, atualização e exclusão
 * diretamente na tabela de alimentos do banco de dados.
 */
class AlimentoRepository {

  /**
   * Insere um novo alimento no banco de dados.
   *
   * @param {Object} dados Dados do alimento.
   * @param {string} dados.nome Nome do alimento.
   * @param {string} dados.tipo Tipo do alimento.
   * @param {number} dados.kcal Quantidade de calorias.
   * @param {number} dados.gorduras Quantidade de gorduras.
   * @param {number} dados.proteinas Quantidade de proteínas.
   * @param {number} dados.carboidratos Quantidade de carboidratos.
   * @param {string} dados.vitaminas Informações sobre vitaminas.
   *
   * @returns {Object} Alimento criado.
   */
  async criar(dados) {
    const r = await db.query(
      `
      INSERT INTO alimentos
      (nome, tipo, kcal, gorduras, proteinas, carboidratos, vitaminas)
      VALUES ($1,$2,$3,$4,$5,$6,$7)
      RETURNING *
      `,
      [
        dados.nome,
        dados.tipo,
        dados.kcal,
        dados.gorduras,
        dados.proteinas,
        dados.carboidratos,
        dados.vitaminas
      ]
    );
    return r.rows[0];
  }

  /**
   * Lista todos os alimentos cadastrados no sistema.
   *
   * Os registros são retornados ordenados alfabeticamente pelo nome.
   *
   * @returns {Array<Object>} Lista de alimentos.
   */
  async listar() {
    const r = await db.query('SELECT * FROM alimentos ORDER BY nome');
    return r.rows;
  }

  /**
   * Atualiza os dados de um alimento existente.
   *
   * @param {number} id ID do alimento.
   * @param {Object} dados Novos dados do alimento.
   *
   * @returns {Object} Alimento atualizado.
   */
  async atualizar(id, dados) {
    const r = await db.query(
      `
      UPDATE alimentos
      SET nome=$1, tipo=$2, kcal=$3, gorduras=$4,
          proteinas=$5, carboidratos=$6, vitaminas=$7
      WHERE id=$8
      RETURNING *
      `,
      [
        dados.nome,
        dados.tipo,
        dados.kcal,
        dados.gorduras,
        dados.proteinas,
        dados.carboidratos,
        dados.vitaminas,
        id
      ]
    );
    return r.rows[0];
  }

  /**
   * Remove um alimento do banco de dados.
   *
   * @param {number} id ID do alimento a ser removido.
   */
  async excluir(id) {
    await db.query('DELETE FROM alimentos WHERE id=$1', [id]);
  }
}

export default new AlimentoRepository();
