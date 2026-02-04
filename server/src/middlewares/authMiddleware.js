import jwt from 'jsonwebtoken';
import UsuarioRepository from '../repositories/UsuarioRepository.js';

// 🔥 MUDE PARA FALSE QUANDO FRONT ESTIVER PRONTO
const DISABLE_AUTH = false;

export default async function authMiddleware(req, res, next) {

  /* ===========================
     MODO TESTE
  =========================== */
  if (DISABLE_AUTH) {

    // simula usuário logado
    req.usuario = { id: 3 };

    return next();
  }

  /* ===========================
     MODO REAL
  =========================== */

  const authHeader = req.headers.authorization;

  if (!authHeader) {
    return res.status(401).json({ erro: 'Token não fornecido' });
  }

  const [, token] = authHeader.split(' ');

  try {

    const decoded = jwt.verify(
      token,
      process.env.JWT_SECRET
    );

    const usuario = await UsuarioRepository.buscarPorId(decoded.id);

    if (!usuario) {
      return res.status(401).json({ erro: 'Usuário não encontrado' });
    }

    if (usuario.status_conta !== 'ATIVA') {
      return res.status(403).json({ erro: 'Conta inativa ou bloqueada' });
    }

    req.usuario = usuario;

    next();

  } catch (error) {
    return res.status(401).json({ erro: 'Token inválido' });
  }
}
