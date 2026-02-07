import db from '../database/connection.js';

/**
 * Repository responsável pelo acesso e manipulação
 * dos dados dos usuários no banco de dados.
 * 
 * Contém apenas operações SQL relacionadas ao usuário.
 */
class UsuarioRepository {

  /**
   * Insere um novo usuário no banco de dados
   *
   * @param {Object} usuario - Dados do usuário
   * @returns {Object} Dados básicos do usuário criado
   */
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

    // Retorna apenas dados essenciais do usuário
    return r.rows[0];
  }

  /**
   * Busca um usuário pelo e-mail
   *
   * @param {string} email
   * @returns {Object} Usuário encontrado
   */
  async buscarPorEmail(email) {
    const r = await db.query(
      `SELECT * FROM usuarios WHERE email = $1`,
      [email]
    );

    return r.rows[0];
  }

  /**
   * Busca um usuário pelo ID
   *
   * @param {number} id
   * @returns {Object} Usuário encontrado
   */
  async buscarPorId(id) {
    const r = await db.query(
      `SELECT * FROM usuarios WHERE id = $1`,
      [id]
    );

    return r.rows[0];
  }

  /**
   * Salva token de recuperação de senha
   *
   * @param {number} id - ID do usuário
   * @param {string} token - Token de recuperação
   * @param {Date} expira - Data de expiração do token
   */
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

  /**
   * Busca usuário pelo token de recuperação válido
   *
   * @param {string} token
   * @returns {Object} Usuário encontrado
   */
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

  /**
   * Atualiza a senha do usuário e remove token de recuperação
   *
   * @param {number} id
   * @param {string} senha - Nova senha criptografada
   */
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

  /**
   * Atualiza dados cadastrais do usuário
   *
   * @param {number} id
   * @param {Object} dados
   * @returns {Object} Usuário atualizado
   */
  async atualizar(id, dados) {
    const r = await db.query(
      `
      UPDATE usuarios
      SET nome_completo = $1,
          peso = $2,
          altura = $3,
          tipo_diabetes = $4,
          foto_perfil = $5,
          data_nascimento = $6,
          updated_at = NOW()
      WHERE id = $7
      RETURNING *
      `,
      [
        dados.nome_completo,
        dados.peso,
        dados.altura,
        dados.tipo_diabetes,
        dados.foto_perfil,
        dados.data_nascimento,
        id
      ]
    );

    return r.rows[0];
  }

  /**
   * Inativa a conta do usuário (exclusão lógica)
   *
   * @param {number} id
   */
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
