import UsuarioService from '../services/UsuarioService.js';

class UsuarioController {
async cadastrar(req, res) {
    const {
      nome_completo,
      email,
      senha,
      data_nascimento,
      peso,
      altura
    } = req.body;

    // validações básicas
    if (!nome_completo || nome_completo.length < 3) {
      return res.status(400).json({ erro: 'Nome inválido' });
    }

    if (!email || !email.includes('@')) {
      return res.status(400).json({ erro: 'Email inválido' });
    }

    if (!senha || senha.length < 6) {
      return res.status(400).json({ erro: 'Senha deve ter no mínimo 6 caracteres' });
    }

    if (peso && peso <= 0) {
      return res.status(400).json({ erro: 'Peso inválido' });
    }

    if (altura && altura <= 0) {
      return res.status(400).json({ erro: 'Altura inválida' });
    }

    try {
      const usuario = await UsuarioService.cadastrar(req.body);
      return res.status(201).json(usuario);
    } catch (error) {
      return res.status(400).json({ erro: error.message });
    }
  }
}

export default new UsuarioController();
