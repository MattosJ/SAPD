import ComparacaoRepository from '../repositories/ComparacaoRepository.js';

/**
 * Service responsável por aplicar as regras de negócio
 * relacionadas à comparação entre o plano alimentar
 * e o consumo real do usuário.
 */
class ComparacaoService {

  /**
   * Compara os valores nutricionais planejados com os valores consumidos.
   *
   * @param {number} usuarioId - Identificador do usuário
   * @param {string} dataInicio - Data inicial do período analisado
   * @param {string} dataFim - Data final do período analisado
   * @returns {Object} Resultado da comparação nutricional
   */
  async comparar(usuarioId, dataInicio, dataFim) {

    // Busca os valores nutricionais planejados no plano alimentar
    const plano =
      await ComparacaoRepository.plano(
        usuarioId,
        dataInicio,
        dataFim
      );

      
    // Busca os valores nutricionais realmente consumidos pelo usuário
    const consumo =
      await ComparacaoRepository.consumo(
        usuarioId,
        dataInicio,
        dataFim
      );

    // Objeto que armazenará o resultado final da comparação
    const resultado = {};

    /**
     * Percorre cada macronutriente que será comparado
     */
    for (const campo of ['kcal', 'carboidratos', 'proteinas', 'gorduras']) {

      // Converte valores para número e evita valores nulos
      const p = Number(plano[campo] || 0);
      const c = Number(consumo[campo] || 0);

      /**
       * Monta o resultado da comparação para cada nutriente
       */
      resultado[campo] = {

        // Valor previsto no plano alimentar
        planejado: p.toFixed(2),

        // Valor efetivamente consumido
        consumido: c.toFixed(2),

        // Diferença entre consumo e planejamento
        diferenca: (c - p).toFixed(2),

        // Status indicando se o usuário consumiu acima, abaixo ou igual ao plano
        status:
          c > p ? 'acima' :
          c < p ? 'abaixo' :
          'igual'
      };
    }

    // Retorna o objeto contendo toda a análise nutricional
    return resultado;
  }
}

export default new ComparacaoService();