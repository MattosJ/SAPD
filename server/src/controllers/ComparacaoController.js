import ComparacaoService from '../services/ComparacaoService.js';
import AlertaService from '../services/AlertaService.js';
class ComparacaoController {

  //compara o plano com o consumo real
  async comparar(req, res) {
    const { dataInicio, dataFim } = req.query;

    const resultado =
      await ComparacaoService.comparar(
        req.usuario.id,
        dataInicio,
        dataFim
      );
      await AlertaService.verificarPlanoConsumo(
        req.usuario.id,
        dataInicio,
        dataFim
);

    return res.json(resultado);
  }
}

export default new ComparacaoController();
