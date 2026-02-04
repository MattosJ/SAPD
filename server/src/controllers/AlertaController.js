import AlertaRepository from '../repositories/AlertaRepository.js';

class AlertaController {

  async listar(req, res) {
    const alertas =
      await AlertaRepository.listar(req.usuario.id);
    return res.json(alertas);
  }

  async marcarLido(req, res) {
    await AlertaRepository.marcarComoLido(
      req.params.id,
      req.usuario.id
    );
    return res.status(204).send();
  }
}

export default new AlertaController();
