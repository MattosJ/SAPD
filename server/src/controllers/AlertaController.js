import AlertaRepository from '../repositories/AlertaRepository.js';

class AlertaController {

  async listar(req, res) {
    const alertas =
      await AlertaRepository.listar(req.usuarioId);
    return res.json(alertas);
  }

  async marcarLido(req, res) {
    await AlertaRepository.marcarComoLido(
      req.params.id,
      req.usuarioId
    );
    return res.status(204).send();
  }
}

export default new AlertaController();
