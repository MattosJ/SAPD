import db from '../database/connection.js';

class AlimentoRepository {

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

  async listar() {
    const r = await db.query('SELECT * FROM alimentos ORDER BY nome');
    return r.rows;
  }

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

  async excluir(id) {
    await db.query('DELETE FROM alimentos WHERE id=$1', [id]);
  }
}

export default new AlimentoRepository();
