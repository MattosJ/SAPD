import db from '../database/connection.js';

class UsuarioRepository {

  async criar(usuario) {
    const result = await db.query(
      `
      INSERT INTO usuarios
      (nome_completo, email, senha, data_nascimento, tipo_diabetes, peso, altura, foto_perfil, status_conta)
      VALUES ($1,$2,$3,$4,$5,$6,$7,$8,$9)
      RETURNING id, nome_completo, email, status_conta
      `,
      [
        usuario.nome_completo,
        usuario.email,
        usuario.senha,
        usuario.data_nascimento,
        usuario.tipo_diabetes,
        usuario.peso,
        usuario.altura,
        usuario.foto_perfil,
        usuario.status_conta
      ]
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
