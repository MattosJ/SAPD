import { Router } from 'express';
import UsuarioController from '../controllers/UsuarioController.js';

const router = Router();

// POST /api/usuarios
router.post('/', UsuarioController.cadastrar);

export default router;
