import ComparacaoService from '../services/ComparacaoService.js';

class ComparacaoController {

  async comparar(req, res) {
    const { dataInicio, dataFim } = req.query;

    const resultado =
      await ComparacaoService.comparar(
        req.usuarioId,
        dataInicio,
        dataFim
      );
      await AlertaService.verificarPlanoConsumo(
        req.usuarioId,
        dataInicio,
        dataFim
);

    return res.json(resultado);
  }
}

export default new ComparacaoController();
