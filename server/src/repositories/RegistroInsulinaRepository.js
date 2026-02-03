import db from '../database/connection.js';

class RegistroInsulinaRepository {

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
        dados.data_hora,
        dados.momento,
        dados.observacoes
      ]
    );

    return result.rows[0];
  }

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

  async atualizar(id, usuario_id, dados) {
    const result = await db.query(
      `
      UPDATE registros_insulina
      SET quantidade_insulina = $1,
          tipo = $2,
          data_hora = $3,
          momento = $4,
          observacoes = $5
      WHERE id = $6 AND usuario_id = $7
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
        dados.data_hora,
        dados.momento,
        dados.observacoes,
        id,
        usuario_id
      ]
    );

    return result.rows[0];
  }

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
