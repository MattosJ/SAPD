import { Router } from 'express';
import RegistroGlicemiaController from '../controllers/RegistroGlicemiaController.js';

const router = Router();

router.post('/glicemia', RegistroGlicemiaController.registrar);
router.get('/glicemia', RegistroGlicemiaController.listar);

export default router;
