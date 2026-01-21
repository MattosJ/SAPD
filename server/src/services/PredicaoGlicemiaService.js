import PredicaoRepository from '../repositories/PredicaoGlicemiaRepository.js';
import RegistroGlicemiaRepository from '../repositories/RegistroGlicemiaRepository.js';
import RefeicaoRepository from '../repositories/RefeicaoRepository.js';

class PredicaoGlicemiaService {

  async gerar(usuarioId) {

    // Últimas 5 medições
    const medicoes =
      await RegistroGlicemiaRepository.ultimas(usuarioId, 5);

    if (medicoes.length === 0) {
      throw new Error('Sem histórico para predição');
    }

    const media =
      medicoes.reduce((s, m) => s + Number(m.valor), 0) / medicoes.length;

    // Última refeição
    const refeicao = await RefeicaoRepository.ultimaPorUsuario(usuarioId);

    let impactoCarbo = 0;

    if (refeicao) {
      impactoCarbo = refeicao.total_carboidratos * 0.5;
    }

    const glicemiaPrevista = media + impactoCarbo;

    return PredicaoRepository.salvar({
      usuarioId,
      glicemia_prevista: glicemiaPrevista,
      data_hora: new Date()
    });
  }

  async confirmar(id, usuarioId, glicemiaReal) {
    return PredicaoRepository.confirmar(id, usuarioId, glicemiaReal);
  }

  async listar(usuarioId) {
    return PredicaoRepository.listarPorUsuario(usuarioId);
  }
}

export default new PredicaoGlicemiaService();
