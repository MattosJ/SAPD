import RelatorioService from '../services/RelatorioService.js';
import gerarRelatorioPDF from '../utils/gerarRelatorioPDF.js';

class RelatorioController {

  async gerar(req, res) {
    const { dataInicio, dataFim } = req.query;

    const dados =
      await RelatorioService.gerar(
        req.usuarioId,
        dataInicio,
        dataFim
      );

    gerarRelatorioPDF(dados, res);
  }
}

export default new RelatorioController();
