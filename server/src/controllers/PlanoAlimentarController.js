import PlanoAlimentarService from '../services/PlanoAlimentarService.js';

class PlanoAlimentarController {

  async criar(req, res) {
    try {
      const plano = await PlanoAlimentarService.criar({
        ...req.body,
        usuarioId: req.usuario.id
      });
      return res.status(201).json(plano);
    } catch (error) {
      return res.status(400).json({ erro: error.message });
    }
  }

  async listar(req, res) {
        const planos = await PlanoAlimentarService.listar(req.usuario.id);
        return res.json(planos);
      }
      async excluir(req, res) {
      try {

        const { id } = req.params;

        const resposta = await PlanoAlimentarService.excluir(
          id,
          req.usuario.id
        );

        res.json(resposta);

      } catch (e) {
        res.status(400).json({ erro: e.message });
      }
    }

}

export default new PlanoAlimentarController();
