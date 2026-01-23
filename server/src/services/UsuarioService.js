import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import UsuarioRepository from '../repositories/UsuarioRepository.js';
import Usuario from '../entities/Usuario.js';
import authConfig from '../config/auth.js';

class UsuarioService {

  async cadastrar(dados) {

    if (dados.data_nascimento) {
      const data = new Date(dados.data_nascimento);
      const hoje = new Date();

      if (data > hoje) {
        throw new Error('Data de nascimento inválida');
      }
    }

    const tiposValidos = ['Tipo 1', 'Tipo 2', 'Gestacional'];
    if (dados.tipo_diabetes && !tiposValidos.includes(dados.tipo_diabetes)) {
      throw new Error('Tipo de diabetes inválido');
    }

    const senhaHash = await bcrypt.hash(dados.senha, 10);

    return UsuarioRepository.criar({
      ...dados,
      senha: senhaHash,
      status_conta: 'ATIVA'
    });
  }

  async login({ email, senha }) {
    const usuario = await UsuarioRepository.buscarPorEmail(email);
    if (!usuario) {
      throw new Error('Usuário não encontrado');
    }

    const senhaValida = await bcrypt.compare(senha, usuario.senha);
    if (!senhaValida) {
      throw new Error('Senha inválida');
    }

    const token = jwt.sign(
      { id: usuario.id, email: usuario.email },
      'segredo_jwt',
      { expiresIn: '1h' }
    );

    return { token };
  }
}

export default new UsuarioService();