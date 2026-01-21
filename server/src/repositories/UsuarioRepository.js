import db from '../database/connection.js';

class UsuarioRepository {

  async criar(usuario) {
    const result = await db.query(
      `INSERT INTO usuarios (nome, email, senha)
       VALUES ($1, $2, $3)
       RETURNING id, nome, email`,
      [usuario.nome, usuario.email, usuario.senha]
    );

    return result.rows[0];
  }

  async buscarPorEmail(email) {
    const result = await db.query(
      `SELECT * FROM usuarios WHERE email = $1`,
      [email]
    );

    return result.rows[0];
  }
}

export default new UsuarioRepository();
