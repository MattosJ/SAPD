import RelatorioRepository from '../repositories/RelatorioRepository.js';

class RelatorioService {

  async gerar(usuarioId, dataInicio, dataFim) {
    const resumo =
      await RelatorioRepository.resumoGlicemia(
        usuarioId,
        dataInicio,
        dataFim
      );

    const medicoes =
      await RelatorioRepository.listarMedicoes(
        usuarioId,
        dataInicio,
        dataFim
      );

    return {
      periodo: { dataInicio, dataFim },
      resumo,
      medicoes
    };
  }
}

export default new RelatorioService();
