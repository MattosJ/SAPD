import db from '../database/connection.js';

class AlimentoRepository {

  async criar(dados) {
    const result = await db.query(
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
    return result.rows[0];
  }

  async listar() {
    const result = await db.query(`SELECT * FROM alimentos ORDER BY nome`);
    return result.rows;
  }
}

export default new AlimentoRepository();
