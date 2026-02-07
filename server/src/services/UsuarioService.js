import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import crypto from 'crypto';
import UsuarioRepository from '../repositories/UsuarioRepository.js';
import PesoRepository from '../repositories/PesoRepository.js';

/**
 * Serviço responsável pela lógica de negócio relacionada a usuários.
 * Inclui cadastro, login, perfil, atualização, recuperação de senha e inativação de conta.
 */
class UsuarioService {

  /**
   * Cadastra um novo usuário.
   * Valida data de nascimento e tipo de diabetes, criptografa a senha e salva o peso inicial se fornecido.
   * @param {Object} dados - Dados do usuário.
   * @param {string} dados.nome_completo - Nome completo do usuário.
   * @param {string} dados.email - Email do usuário.
   * @param {string} dados.senha - Senha em texto plano.
   * @param {string} [dados.data_nascimento] - Data de nascimento (YYYY-MM-DD).
   * @param {string} [dados.tipo_diabetes] - Tipo de diabetes: "Tipo 1", "Tipo 2" ou "Gestacional".
   * @param {number} [dados.peso] - Peso inicial do usuário.
   * @returns {Promise<Object>} Usuário recém-criado.
   * @throws {Error} Se data de nascimento ou tipo de diabetes forem inválidos.
   */
  async cadastrar(dados) {
    if (dados.data_nascimento) {
      const data = new Date(dados.data_nascimento);
      if (data > new Date()) {
        throw new Error('Data de nascimento inválida');
      }
    }

    const tiposValidos = ['Tipo 1', 'Tipo 2', 'Gestacional'];
    if (dados.tipo_diabetes && !tiposValidos.includes(dados.tipo_diabetes)) {
      throw new Error('Tipo de diabetes inválido');
    }

    const senhaHash = await bcrypt.hash(dados.senha, 10);

    const usuario = await UsuarioRepository.criar({
      ...dados,
      senha: senhaHash,
      status_conta: 'ATIVA'
    });

    if (dados.peso) {
      await PesoRepository.criar(usuario.id, dados.peso);
    }

    return usuario;
  }

  /**
   * Realiza o login do usuário.
   * Verifica email, senha e status da conta, retornando um token JWT.
   * @param {Object} param0
   * @param {string} param0.email - Email do usuário.
   * @param {string} param0.senha - Senha do usuário.
   * @returns {Promise<{token: string, usuario: {id: number, nome: string, email: string}}>} Token JWT e dados básicos do usuário.
   * @throws {Error} Se usuário não existir, conta inativa ou senha inválida.
   */
  async login({ email, senha }) {
    const usuario = await UsuarioRepository.buscarPorEmail(email);
    if (!usuario) throw new Error('Usuário não encontrado');
    if (usuario.status_conta !== 'ATIVA') throw new Error('Conta inativa');

    const senhaValida = await bcrypt.compare(senha, usuario.senha);
    if (!senhaValida) throw new Error('Senha inválida');

    const token = jwt.sign(
      { id: usuario.id },
      process.env.JWT_SECRET,
      { expiresIn: process.env.JWT_EXPIRES }
    );

    return {
      token,
      usuario: {
        id: usuario.id,
        nome: usuario.nome_completo,
        email: usuario.email
      }
    };
  }

  /**
   * Busca o perfil de um usuário pelo ID.
   * Formata a data de nascimento para "YYYY-MM-DD" se existir.
   * @param {number} id - ID do usuário.
   * @returns {Promise<Object>} Dados do usuário.
   * @throws {Error} Se usuário não for encontrado.
   */
  async buscarPerfil(id) {
    const usuario = await UsuarioRepository.buscarPorId(id);
    if (!usuario) throw new Error('Usuário não encontrado');

    if (usuario.data_nascimento) {
      usuario.data_nascimento = usuario.data_nascimento
        .toISOString()
        .split('T')[0];
    }

    return usuario;
  }

  /**
   * Atualiza o perfil do usuário.
   * Se fornecido peso, cria registro de peso.
   * @param {number} id - ID do usuário.
   * @param {Object} dados - Dados a atualizar.
   * @param {string} [dados.nome_completo] - Nome completo.
   * @param {string} [dados.email] - Email.
   * @param {string} [dados.tipo_diabetes] - Tipo de diabetes.
   * @param {string} [dados.data_nascimento] - Data de nascimento.
   * @param {number} [dados.peso] - Novo peso.
   * @returns {Promise<Object>} Usuário atualizado.
   */
  async atualizarPerfil(id, dados) {
    const usuario = await UsuarioRepository.atualizar(id, dados);
    if (dados.peso) {
      await PesoRepository.criar(id, dados.peso);
    }
    return usuario;
  }

  /**
   * Solicita recuperação de senha gerando um token temporário.
   * @param {string} email - Email do usuário.
   * @returns {Promise<{mensagem: string}>} Mensagem confirmando geração do token.
   * @throws {Error} Se usuário não for encontrado.
   */
  async solicitarRecuperacao(email) {
    const usuario = await UsuarioRepository.buscarPorEmail(email);
    if (!usuario) throw new Error('Usuário não encontrado');

    const token = crypto.randomBytes(32).toString('hex');
    const expira = new Date(Date.now() + 60 * 60 * 1000); // 1 hora

    await UsuarioRepository.salvarTokenRecuperacao(usuario.id, token, expira);

    return { mensagem: 'Token de recuperação gerado' };
  }

  /**
   * Redefine a senha do usuário usando token de recuperação.
   * @param {string} token - Token de recuperação.
   * @param {string} novaSenha - Nova senha (mínimo 6 caracteres).
   * @returns {Promise<void>}
   * @throws {Error} Se token inválido/expirado ou senha inválida.
   */
  async redefinirSenha(token, novaSenha) {
    if (!novaSenha || novaSenha.length < 6) {
      throw new Error('Senha deve ter no mínimo 6 caracteres');
    }

    const usuario = await UsuarioRepository.buscarPorToken(token);
    if (!usuario) throw new Error('Token inválido ou expirado');

    const senhaHash = await bcrypt.hash(novaSenha, 10);
    await UsuarioRepository.atualizarSenha(usuario.id, senhaHash);
  }

  /**
   * Inativa a conta do usuário.
   * @param {number} id - ID do usuário.
   * @returns {Promise<void>}
   */
  async inativarConta(id) {
    await UsuarioRepository.inativar(id);
  }
}

export default new UsuarioService();
