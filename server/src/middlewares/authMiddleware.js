import jwt from 'jsonwebtoken';
import authConfig from '../config/auth.js';
import UsuarioRepository from '../repositories/UsuarioRepository.js';

export default async function authMiddleware(req, res, next) {
  const authHeader = req.headers.authorization;

  if (!authHeader) {
    return res.status(401).json({ erro: 'Token não fornecido' });
  }

  // Formato esperado: "Bearer TOKEN"
  const [, token] = authHeader.split(' ');

  try {
    const decoded = jwt.verify(token, authConfig.secret);

    const usuario = await UsuarioRepository.buscarPorId(decoded.id);

    if (!usuario) {
      return res.status(401).json({ erro: 'Usuário não encontrado' });
    }

    if (usuario.status_conta !== 'ATIVA') {
      return res.status(403).json({ erro: 'Conta inativa ou bloqueada' });
    }

    // Disponibiliza o usuário para as próximas camadas
    req.usuario = usuario;

    return next();

  } catch (error) {
    return res.status(401).json({ erro: 'Token inválido' });
  }
}
