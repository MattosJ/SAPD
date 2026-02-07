import PredicaoRepository from '../repositories/PredicaoGlicemiaRepository.js';
import RegistroGlicemiaRepository from '../repositories/RegistroGlicemiaRepository.js';
import RefeicaoRepository from '../repositories/RefeicaoRepository.js';
import { formatarDataHora } from '../utils/formatarDataHora.js';

/**
 * Service responsável por gerar predições de glicemia
 * com base no histórico do usuário e no consumo alimentar recente.
 * 
 * Essa camada contém regras de negócio e cálculos.
 */
class PredicaoGlicemiaService {
  
  /**
   * Gera uma predição de glicemia baseada nas últimas medições
   * e na última refeição registrada pelo usuário.
   *
   * @param {number} usuarioId - Identificador do usuário
   * @returns {Object} Predição salva no banco
   */
  async gerar(usuarioId) {

    // Busca as últimas 5 medições de glicemia do usuário
    const medicoes =
      await RegistroGlicemiaRepository.ultimas(usuarioId, 5);

    // Verifica se existe histórico suficiente
    if (medicoes.length === 0) {
      throw new Error('Sem histórico para predição');
    }

    // Calcula a média das medições anteriores
    const media =
      medicoes.reduce((soma, medicao) =>
        soma + Number(medicao.valor), 0) / medicoes.length;

    // Busca a última refeição registrada
    const refeicao =
      await RefeicaoRepository.ultimaPorUsuario(usuarioId);

    let impactoCarbo = 0;

    // Calcula impacto dos carboidratos na glicemia
    if (refeicao) {
      impactoCarbo = refeicao.total_carboidratos * 0.5;
    }

    // Define valor previsto de glicemia
    const glicemiaPrevista = media + impactoCarbo;

    // Salva a predição no banco
    return PredicaoRepository.salvar({
      usuarioId,
      glicemia_prevista: glicemiaPrevista,
      data_hora: new Date()
    });
  }

  /**
   * Confirma uma predição com o valor real medido posteriormente
   *
   * @param {number} id - Identificador da predição
   * @param {number} usuarioId - Identificador do usuário
   * @param {number} glicemiaReal - Valor real medido
   */
  async confirmar(id, usuarioId, glicemiaReal) {
    return PredicaoRepository.confirmar(id, usuarioId, glicemiaReal);
  }

  /**
   * Lista todas as predições do usuário com dados formatados
   *
   * @param {number} usuarioId - Identificador do usuário
   * @returns {Array} Lista de predições
   */
  async listar(usuarioId) {

    const predicoes =
      await PredicaoRepository.listarPorUsuario(usuarioId);

    // Formata data e estrutura resposta
    return predicoes.map(predicao => {

      const { data, hora } =
        formatarDataHora(predicao.data_hora);

      return {
        id: predicao.id,
        glicemiaPrevista: Number(predicao.glicemia_prevista),
        data,
        hora,
        confirmada: predicao.confirmada,
        glicemiaReal: predicao.glicemia_real
      };
    });
  
  }
}

export default new PredicaoGlicemiaService();
