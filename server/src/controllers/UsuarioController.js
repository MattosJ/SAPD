import UsuarioService from '../services/UsuarioService.js';

class UsuarioController {

  async cadastrar(req, res) {
    try {
      const usuario = await UsuarioService.cadastrar(req.body);
      res.status(201).json(usuario);
    } catch (e) {
      res.status(400).json({ erro: e.message });
    }
  }

  async login(req, res) {
    try {
      const r = await UsuarioService.login(req.body);
      res.json(r);
    } catch (e) {
      res.status(401).json({ erro: e.message });
    }
  }

  async me(req, res) {
    try {
      const usuario = await UsuarioService.buscarPerfil(req.userId);
      res.json(usuario);
    } catch (e) {
      res.status(404).json({ erro: e.message });
    }
  }

  async atualizar(req, res) {
    try {
      const usuario = await UsuarioService.atualizarPerfil(req.userId, req.body);
      res.json(usuario);
    } catch (e) {
      res.status(400).json({ erro: e.message });
    }
  }

  async recuperarSenha(req, res) {
    try {
      const r = await UsuarioService.solicitarRecuperacao(req.body.email);
      res.json(r);
    } catch (e) {
      res.status(400).json({ erro: e.message });
    }
  }

  async redefinirSenha(req, res) {
    try {
      await UsuarioService.redefinirSenha(
        req.body.token,
        req.body.novaSenha
      );
      res.json({ mensagem: 'Senha redefinida com sucesso' });
    } catch (e) {
      res.status(400).json({ erro: e.message });
    }
  }

  async inativar(req, res) {
    await UsuarioService.inativarConta(req.userId);
    res.json({ mensagem: 'Conta inativada com sucesso' });
  }
}

export default new UsuarioController();
