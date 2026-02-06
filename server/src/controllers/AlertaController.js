import AlertaRepository from '../repositories/AlertaRepository.js';

class AlertaController {

  //lista todos os alertas
  async listar(req, res) {
    const alertas =
      await AlertaRepository.listar(req.usuario.id);
    return res.json(alertas);
  }

  //marca o exato alerta como lido
  async marcarLido(req, res) {
    await AlertaRepository.marcarComoLido(
      req.params.id,
      req.usuario.id
    );
    return res.status(204).send();
  }
}

export default new AlertaController();
