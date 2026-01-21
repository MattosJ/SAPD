import AlertaRepository from '../repositories/AlertaRepository.js';
import ComparacaoService from './ComparacaoService.js';
import RegistroGlicemiaRepository from '../repositories/RegistroGlicemiaRepository.js';

class AlertaService {

  async verificarPlanoConsumo(usuarioId, dataInicio, dataFim) {
    const comparacao =
      await ComparacaoService.comparar(
        usuarioId,
        dataInicio,
        dataFim
      );

    if (comparacao.carboidratos.status === 'acima') {
      await AlertaRepository.criar({
        usuarioId,
        tipo: 'alimentacao',
        mensagem: 'Consumo de carboidratos acima do plano alimentar.',
        nivel: 'aviso'
      });
    }
  }

  async verificarGlicemia(usuarioId) {
    const ultima =
      await RegistroGlicemiaRepository.ultima(usuarioId);

    if (!ultima) return;

    if (ultima.valor < 70) {
      await AlertaRepository.criar({
        usuarioId,
        tipo: 'glicemia',
        mensagem: 'Glicemia abaixo do limite recomendado.',
        nivel: 'critico'
      });
    }

    if (ultima.valor > 180) {
      await AlertaRepository.criar({
        usuarioId,
        tipo: 'glicemia',
        mensagem: 'Glicemia acima do limite recomendado.',
        nivel: 'critico'
      });
    }
  }
}

export default new AlertaService();
