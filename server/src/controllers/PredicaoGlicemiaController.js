import PredicaoService from '../services/PredicaoGlicemiaService.js';

class PredicaoGlicemiaController {

  async gerar(req, res) {
    try {
      const predicao =
        await PredicaoService.gerar(req.usuario.id);
      return res.status(201).json(predicao);
    } catch (error) {
      return res.status(400).json({ erro: error.message });
    }
  }

  async confirmar(req, res) {
    await PredicaoService.confirmar(
      req.params.id,
      req.usuario.id,
      req.body.glicemia_real
    );
    return res.status(204).send();
  }

  async listar(req, res) {
    const dados =
      await PredicaoService.listar(req.usuario.id);
    return res.json(dados);
  }
}

export default new PredicaoGlicemiaController();
