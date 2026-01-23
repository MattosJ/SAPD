import ComparacaoRepository from '../repositories/ComparacaoRepository.js';

class ComparacaoService {

  async comparar(usuarioId, dataInicio, dataFim) {

    const plano =
      await ComparacaoRepository.plano(
        usuarioId,
        dataInicio,
        dataFim
      );

    const consumo =
      await ComparacaoRepository.consumo(
        usuarioId,
        dataInicio,
        dataFim
      );

    const resultado = {};

    for (const campo of ['kcal', 'carboidratos', 'proteinas', 'gorduras']) {
      const p = Number(plano[campo] || 0);
      const c = Number(consumo[campo] || 0);

      resultado[campo] = {
        planejado: p.toFixed(2),
        consumido: c.toFixed(2),
        diferenca: (c - p).toFixed(2),
        status:
          c > p ? 'acima' :
          c < p ? 'abaixo' :
          'igual'
      };
    }

    return resultado;
  }
}

export default new ComparacaoService();
