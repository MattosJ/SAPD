import PlanoAlimentarRepository from '../repositories/PlanoAlimentarRepository.js';
import {formatarData, formatarDataHora} from '../utils/formatarDataHora.js';
class PlanoAlimentarService {

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
          await PlanoAlimentarRepository.listarAlimentos(refeicaoCriada.id);

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
        data_inicio: formatarData(plano.data_inicio), // usa sua função
        data_fim: formatarData(plano.data_fim),       // usa sua função
        refeicoes: refeicoesFormatadas
      };
    }

async listar(usuario_id){

   const planos = await PlanoAlimentarRepository.listarPorUsuario(usuario_id);

   const resultado = [];

   for(const plano of planos){

      const refeicoes = await PlanoAlimentarRepository.listarRefeicoes(plano.id);

      const dataInicio = formatarData(plano.data_inicio);
      const dataFim = formatarData(plano.data_fim);
      
      const refeicoesFormatadas = refeicoes.map(refeicao=>{
        const { data, hora } = formatarDataHora(refeicao.data_hora);

         return {
            id:refeicao.id,
            usuario_id: refeicao.usuario_id,
            tipo: refeicao.tipo,
            data,
            hora
         };
      });

      resultado.push({
         id: plano.id,
         nome: plano.nome,
         data_inicio: dataInicio,
         data_fim: dataFim,
         refeicoes: refeicoesFormatadas
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
