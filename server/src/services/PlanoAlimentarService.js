import PlanoAlimentarRepository from '../repositories/PlanoAlimentarRepository.js';
import {formatarData, formatarDataHora} from '../utils/formatarDataHora.js';
class PlanoAlimentarService {


  //Cria um plano alimentar com os alimentos já vinculados
  async criar(dados) {
        const plano = await PlanoAlimentarRepository.criarPlano(dados);

        const refeicoesFormatadas = [];

        for (const refeicao of dados.refeicoes) {

          const refeicaoCriada =
            await PlanoAlimentarRepository.criarRefeicao(plano.id, refeicao);

          // salvar alimentos
          for (const alimento of refeicao.alimentos) {
            await PlanoAlimentarRepository.adicionarAlimento(
              refeicaoCriada.id,
              alimento
            );
          }

          // buscar alimentos já vinculados
          const alimentosSalvos =
            await PlanoAlimentarRepository.listarAlimentosDaRefeicao(refeicaoCriada.id);

          refeicoesFormatadas.push({
            id: refeicaoCriada.id,
            tipo: refeicaoCriada.tipo,
            horario: refeicaoCriada.horario,
            alimentos: alimentosSalvos
          });
        }

        return {
          id: plano.id,
          descricao: plano.descricao,
          data_inicio: formatarData(plano.data_inicio), 
          data_fim: formatarData(plano.data_fim),       
          refeicoes: refeicoesFormatadas
        };
    }

    //Lista todo plano alimentar     
    async listar(usuario_id){
      const planos = await PlanoAlimentarRepository.listarPorUsuario(usuario_id);

      const resultado = [];

for (const plano of planos) {

  const refeicoes = await PlanoAlimentarRepository.listarRefeicoes(plano.id);

  const dataInicio = formatarData(plano.data_inicio);
  const dataFim = formatarData(plano.data_fim);

  const refeicoesComAlimentos = [];

  for (const refeicao of refeicoes) {

    // 🔥 busca alimentos da refeição
    const alimentos =
      await PlanoAlimentarRepository.listarAlimentosDaRefeicao(refeicao.id);

    refeicoesComAlimentos.push({
      id: refeicao.id,
      tipo: refeicao.tipo,
      horario: refeicao.horario,
      alimentos
    });
  }

  resultado.push({
    id: plano.id,
    nome: plano.nome,
    descricao: plano.descricao,
    data_inicio: dataInicio,
    data_fim: dataFim,
    refeicoes: refeicoesComAlimentos
  });
}


      return resultado;
    }
    async excluir(planoId, usuarioId) {

      await PlanoAlimentarRepository.excluir(planoId, usuarioId);

      return { mensagem: 'Plano excluído com sucesso' };
    }

}

export default new PlanoAlimentarService();
