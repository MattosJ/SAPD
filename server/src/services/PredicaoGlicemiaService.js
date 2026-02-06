import PredicaoRepository from '../repositories/PredicaoGlicemiaRepository.js';
import RegistroGlicemiaRepository from '../repositories/RegistroGlicemiaRepository.js';
import RefeicaoRepository from '../repositories/RefeicaoRepository.js';
import { formatarDataHora } from '../utils/formatarDataHora.js';

class PredicaoGlicemiaService {
  
  //Busca ás 5 ultimas medições de glicemia 
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

  // Mostra todas ás predições
  async listar(usuarioId) {
    const predicoes = await PredicaoRepository.listarPorUsuario(usuarioId);
    return predicoes.map(predicao => {
      const { data, hora } = formatarDataHora(predicao.data_hora);

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
