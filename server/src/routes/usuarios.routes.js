import { Router } from 'express';
import UsuarioController from '../controllers/UsuarioController.js';
import authMiddleware from '../middlewares/authMiddleware.js';

const router = Router();

// públicas
router.post('/cadastrar', UsuarioController.cadastrar);
router.post('/login', UsuarioController.login);
router.post('/recuperar-senha', UsuarioController.recuperarSenha);
router.post('/redefinir-senha', UsuarioController.redefinirSenha);

// protegidas
router.use(authMiddleware);
router.get('/', UsuarioController.me);
router.put('/me', UsuarioController.atualizar);
router.delete('/me', UsuarioController.inativar);

export default router;
