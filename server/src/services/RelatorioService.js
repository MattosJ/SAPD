import RelatorioRepository from '../repositories/RelatorioRepository.js';


function separarDataHora(dataHora) {
  const d = new Date(dataHora);

  return {
    data: d.toLocaleDateString('pt-BR', {
      day: '2-digit',
      month: '2-digit',
    }),
    hora: d.toLocaleTimeString('pt-BR', {
      hour: '2-digit',
      minute: '2-digit',
    }),
  };
}

class RelatorioService {
  //Busca todos dados necessarios para o relatorio, glicemia, refeicoes e peso
  async buscarPrincipal(usuarioId) {
    const glicemia =
      await RelatorioRepository.glicemiaGrafico(usuarioId);

    const peso =
      await RelatorioRepository.pesoGrafico(usuarioId);

    const relatoriosRefeicaoRaw =
      await RelatorioRepository.relatorioRefeicoes(usuarioId);

    const relatoriosPesoRaw =
      await RelatorioRepository.relatorioPeso(usuarioId);

    const relatoriosRefeicao = relatoriosRefeicaoRaw.map((relatorio) => {
      const inicio = separarDataHora(relatorio.dataInicio);
      const fim = separarDataHora(relatorio.dataFim);

      return {
        ...relatorio,
        dataInicio: inicio.data,
        horaInicio: inicio.hora,
        dataFim: fim.data,
        horaFim: fim.hora,
      };
    });

    const relatoriosPeso = relatoriosPesoRaw.map((relatorio) => {
      const inicio = separarDataHora(relatorio.dataInicio);
      const fim = separarDataHora(relatorio.dataFim);

      return {
        ...relatorio,
        dataInicio: inicio.data,
        horaInicio: inicio.hora,
        dataFim: fim.data,
        horaFim: fim.hora,
      };
    });

    return {
      glicemia,
      peso,
      relatoriosRefeicao,
      relatoriosPeso,
    };
  }
  //Busca insulina por tipo de selção {dia}, {mê}, {ano}
  async buscarPorTempo(usuarioId, tipoSelecao) {
    const glicemia =
      await RelatorioRepository.glicemiaPorTempo(usuarioId, tipoSelecao);

    const peso =
      await RelatorioRepository.pesoPorTempo(usuarioId, tipoSelecao);

    return { glicemia, peso };
  }
}

export default new RelatorioService();
