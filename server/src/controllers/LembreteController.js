import LembreteService from '../services/LembreteService.js';

class LembreteController {

  async criar(req, res) {
    try {
      const lembrete = await LembreteService.criar({
        ...req.body,
        usuarioId: req.usuario.id
      });
      return res.status(201).json(lembrete);
    } catch (error) {
      return res.status(400).json({ erro: error.message });
    }
  }

  async listar(req, res) {
    const lembretes = await LembreteService.listar(req.usuario.id);
    return res.json(lembretes);
  }

  async atualizar(req, res) {
    try {
      await LembreteService.atualizar(
        req.params.id,
        req.usuarioId,
        req.body
      );
      return res.status(204).send();
    } catch (error) {
      return res.status(400).json({ erro: error.message });
    }
  }

  async excluir(req, res) {
    await LembreteService.excluir(req.params.id, req.usuarioId);
    return res.status(204).send();
  }
}

export default new LembreteController();
