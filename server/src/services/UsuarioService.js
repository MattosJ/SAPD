import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import crypto from 'crypto';
import UsuarioRepository from '../repositories/UsuarioRepository.js';
import PesoRepository from '../repositories/PesoRepository.js';

class UsuarioService {
  //Cadastra o usuario
  async cadastrar(dados) {
    if (dados.data_nascimento) {
      const data = new Date(dados.data_nascimento);
      if (data > new Date()) {
        throw new Error('Data de nascimento inválida');
      }
    }

    //Tipos de diabetes
    const tiposValidos = ['Tipo 1', 'Tipo 2', 'Gestacional'];
    if (dados.tipo_diabetes && !tiposValidos.includes(dados.tipo_diabetes)) {
      throw new Error('Tipo de diabetes inválido');
    }

    //Criptografa a senha
    const senhaHash = await bcrypt.hash(dados.senha, 10);
    // 🔥 cria usuário
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

  
  async login({ email, senha }) {

    const usuario = await UsuarioRepository.buscarPorEmail(email);

    if (!usuario) {
      throw new Error('Usuário não encontrado');
    }

    if (usuario.status_conta !== 'ATIVA') {
      throw new Error('Conta inativa');
    }

    const senhaValida = await bcrypt.compare(senha, usuario.senha);

    if (!senhaValida) {
      throw new Error('Senha inválida');
    }

    // GERA TOKEN
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



  async buscarPerfil(id) {
    const usuario = await UsuarioRepository.buscarPorId(id);
    if (usuario.data_nascimento) {
    usuario.data_nascimento = usuario.data_nascimento
    .toISOString()
    .split('T')[0];
}
    if (!usuario) throw new Error('Usuário não encontrado');
    return usuario;
  }

  async atualizarPerfil(id, dados) {
    const usuario = await UsuarioRepository.atualizar(id,dados);
    if (dados.peso) {
      await PesoRepository.criar(id,dados.peso);
    }
    return usuario;
  }

  async solicitarRecuperacao(email) {
    const usuario = await UsuarioRepository.buscarPorEmail(email);
    if (!usuario) throw new Error('Usuário não encontrado');

    const token = crypto.randomBytes(32).toString('hex');
    const expira = new Date(Date.now() + 60 * 60 * 1000);

    await UsuarioRepository.salvarTokenRecuperacao(usuario.id, token, expira);

   
    return { mensagem: 'Token de recuperação gerado' };
  }

  async redefinirSenha(token, novaSenha) {
    if (!novaSenha || novaSenha.length < 6) {
      throw new Error('Senha deve ter no mínimo 6 caracteres');
    }

    const usuario = await UsuarioRepository.buscarPorToken(token);
    if (!usuario) throw new Error('Token inválido ou expirado');

    const senhaHash = await bcrypt.hash(novaSenha, 10);
    await UsuarioRepository.atualizarSenha(usuario.id, senhaHash);
  }

  async inativarConta(id) {
    await UsuarioRepository.inativar(id);
  }
}

export default new UsuarioService();
