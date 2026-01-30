import db from '../database/connection.js';

class RegistroGlicemiaRepository {

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
