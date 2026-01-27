import RegistroInsulinaService from '../services/RegistroInsulinaService.js';

class RegistroInsulinaController {

  async criar(req, res) {
    try {
      const registro = await RegistroInsulinaService.criar({
        ...req.body,
        usuario_id: req.usuario.id
      });
      res.status(201).json(registro);
    } catch (e) {
      res.status(400).json({ erro: e.message });
    }
  }

  async listar(req, res) {
    const registros = await RegistroInsulinaService.listar(req.usuario.id);
    res.json(registros);
  }

  async buscar(req, res) {
    try {
      const registro = await RegistroInsulinaService.buscar(
        req.params.id,
        req.usuario.id
      );
      res.json(registro);
    } catch (e) {
      res.status(404).json({ erro: e.message });
    }
  }

  async atualizar(req, res) {
    try {
      const registro = await RegistroInsulinaService.atualizar(
        req.params.id,
        req.usuario.id,
        req.body
      );
      res.json(registro);
    } catch (e) {
      res.status(400).json({ erro: e.message });
    }
  }

  async excluir(req, res) {
    await RegistroInsulinaService.excluir(req.params.id, req.usuario.id);
    res.status(204).send();
  }
}

export default new RegistroInsulinaController();
