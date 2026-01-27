import db from '../database/connection.js';

class UsuarioRepository {

  async criar(usuario) {
    const r = await db.query(
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
    return r.rows[0];
  }

  async buscarPorEmail(email) {
    const r = await db.query(
      `SELECT * FROM usuarios WHERE email = $1`,
      [email]
    );
    return r.rows[0];
  }

  async buscarPorId(id) {
    const r = await db.query(
      `SELECT * FROM usuarios WHERE id = $1`,
      [id]
    );
    return r.rows[0];
  }

  async salvarTokenRecuperacao(id, token, expira) {
    await db.query(
      `
      UPDATE usuarios
      SET reset_token = $1,
          reset_token_expira = $2
      WHERE id = $3
      `,
      [token, expira, id]
    );
  }

  async buscarPorToken(token) {
    const r = await db.query(
      `
      SELECT * FROM usuarios
      WHERE reset_token = $1
        AND reset_token_expira > NOW()
      `,
      [token]
    );
    return r.rows[0];
  }

  async atualizarSenha(id, senha) {
    await db.query(
      `
      UPDATE usuarios
      SET senha = $1,
          reset_token = NULL,
          reset_token_expira = NULL
      WHERE id = $2
      `,
      [senha, id]
    );
  }

  async atualizar(id, dados) {
    const r = await db.query(
      `
      UPDATE usuarios
      SET nome_completo = $1,
          peso = $2,
          altura = $3,
          tipo_diabetes = $4,
          foto_perfil = $5,
          updated_at = NOW()
      WHERE id = $6
      RETURNING *
      `,
      [
        dados.nome_completo,
        dados.peso,
        dados.altura,
        dados.tipo_diabetes,
        dados.foto_perfil,
        id
      ]
    );
    return r.rows[0];
  }

  async inativar(id) {
    await db.query(
      `
      UPDATE usuarios
      SET status_conta = 'INATIVA',
          updated_at = NOW()
      WHERE id = $1
      `,
      [id]
    );
  }
}

export default new UsuarioRepository();
