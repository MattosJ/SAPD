import PlanoAlimentarRepository from '../repositories/PlanoAlimentarRepository.js';
import {formatarData, formatarDataHora} from '../utils/formatarDataHora.js';
class PlanoAlimentarService {

  async criar(dados) {
    const plano = await PlanoAlimentarRepository.criarPlano(dados);

    for (const refeicao of dados.refeicoes) {
      const refeicaoCriada =
        await PlanoAlimentarRepository.criarRefeicao(plano.id, refeicao);

      for (const alimento of refeicao.alimentos) {
        await PlanoAlimentarRepository.adicionarAlimento(
          refeicaoCriada.id,
          alimento
        );
      }
    }

    return plano;
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

}

export default new PlanoAlimentarService();
