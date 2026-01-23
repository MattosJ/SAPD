import RegistroInsulinaService from '../services/RegistroInsulinaService.js';

class RegistroInsulinaController {

  async registrar(req, res) {
    try {
      const dados = {
        ...req.body,
        usuarioId: req.usuarioId
      };

      const registro = await RegistroInsulinaService.registrar(dados);
      return res.status(201).json(registro);
    } catch (error) {
      return res.status(400).json({ erro: error.message });
    }
  }

  async listar(req, res) {
    try {
      const registros = await RegistroInsulinaService.listar(req.usuarioId);
      return res.json(registros);
    } catch (error) {
      return res.status(400).json({ erro: error.message });
    }
  }

  async excluir(req, res) {
    try {
      const { id } = req.params;
      await RegistroInsulinaService.excluir(id, req.usuarioId);
      return res.status(204).send();
    } catch (error) {
      return res.status(400).json({ erro: error.message });
    }
  }
}

export default new RegistroInsulinaController();
