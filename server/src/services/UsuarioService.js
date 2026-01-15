import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import UsuarioRepository from '../repositories/UsuarioRepository.js';
import Usuario from '../entities/Usuario.js';

class UsuarioService {

  async cadastrar(dados) {
    // 1️⃣ Cria a entidade (validação acontece aqui)
    const usuario = new Usuario(dados);

    // 2️⃣ Criptografa a senha
    const senhaHash = await bcrypt.hash(usuario.senha, 10);
    usuario.senha = senhaHash;

    // 3️⃣ Salva no repositório
    return UsuarioRepository.criar(usuario);
  }

  async login({ email, senha }) {
    const usuario = UsuarioRepository.buscarPorEmail(email);
    if (!usuario) {
      throw new Error('Usuário não encontrado');
    }

    const valido = await bcrypt.compare(senha, usuario.senha);
    if (!valido) {
      throw new Error('Senha inválida');
    }

    return jwt.sign(
      { id: usuario.id },
      'segredo',
      { expiresIn: '1h' }
    );
  }
}

export default new UsuarioService();
