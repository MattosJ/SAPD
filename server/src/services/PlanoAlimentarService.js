import PlanoAlimentarRepository from '../repositories/PlanoAlimentarRepository.js';
import {formatarData, formatarDataHora} from '../utils/formatarDataHora.js';

/**
 * Service responsável por implementar as regras de negócio
 * relacionadas aos planos alimentares.
 *
 * Atua como camada intermediária entre o Controller e o Repository,
 * coordenando operações, organizando dados e garantindo a integridade
 * das informações antes de enviá-las ao cliente.
 */
class PlanoAlimentarService {


  /**
   * Cria um plano alimentar completo com refeições e alimentos vinculados.
   *
   * Essa função realiza a orquestração da criação do plano alimentar,
   * incluindo:
   * 1. Criação do plano
   * 2. Criação das refeições associadas
   * 3. Associação dos alimentos às refeições
   * 4. Formatação dos dados para retorno ao cliente
   *
   * @param {Object} dados Dados do plano alimentar contendo refeições e alimentos.
   *
   * @returns {Object} Plano alimentar completo formatado.
   */
  async criar(dados) {

    // Cria o plano alimentar
    const plano = await PlanoAlimentarRepository.criarPlano(dados);

    const refeicoesFormatadas = [];

    // Percorre todas as refeições enviadas
    for (const refeicao of dados.refeicoes) {

      // Cria a refeição vinculada ao plano
      const refeicaoCriada =
        await PlanoAlimentarRepository.criarRefeicao(plano.id, refeicao);

      // Salva alimentos vinculados à refeição
      for (const alimento of refeicao.alimentos) {
        await PlanoAlimentarRepository.adicionarAlimento(
          refeicaoCriada.id,
          alimento
        );
      }

      // Recupera alimentos já salvos para retorno ao cliente
      const alimentosSalvos =
        await PlanoAlimentarRepository.listarAlimentosDaRefeicao(refeicaoCriada.id);

      // Estrutura a refeição para resposta
      refeicoesFormatadas.push({
        id: refeicaoCriada.id,
        tipo: refeicaoCriada.tipo,
        horario: refeicaoCriada.horario,
        alimentos: alimentosSalvos
      });
    }

    // Retorna plano formatado com datas tratadas
    return {
      id: plano.id,
      descricao: plano.descricao,
      data_inicio: formatarData(plano.data_inicio),
      data_fim: formatarData(plano.data_fim),
      refeicoes: refeicoesFormatadas
    };
  }


  /**
   * Lista todos os planos alimentares de um usuário.
   *
   * Essa função organiza os dados retornados do banco,
   * incluindo:
   * - Formatação das datas
   * - Vinculação das refeições aos planos
   * - Vinculação dos alimentos às refeições
   *
   * @param {number} usuario_id ID do usuário.
   *
   * @returns {Array<Object>} Lista de planos alimentares completos.
   */
  async listar(usuario_id){

    // Busca planos do usuário
    const planos = await PlanoAlimentarRepository.listarPorUsuario(usuario_id);

    const resultado = [];

    // Percorre cada plano
    for (const plano of planos) {

      // Busca refeições do plano
      const refeicoes = await PlanoAlimentarRepository.listarRefeicoes(plano.id);

      // Formata datas
      const dataInicio = formatarData(plano.data_inicio);
      const dataFim = formatarData(plano.data_fim);

      const refeicoesComAlimentos = [];

      // Percorre refeições
      for (const refeicao of refeicoes) {

        // Busca alimentos vinculados à refeição
        const alimentos =
          await PlanoAlimentarRepository.listarAlimentosDaRefeicao(refeicao.id);

        refeicoesComAlimentos.push({
          id: refeicao.id,
          tipo: refeicao.tipo,
          horario: refeicao.horario,
          alimentos
        });
      }

      // Estrutura resposta final do plano
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


  /**
   * Remove um plano alimentar do usuário.
   *
   * A exclusão inclui todos os dados relacionados,
   * como refeições e alimentos vinculados.
   *
   * @param {number} planoId ID do plano alimentar.
   * @param {number} usuarioId ID do usuário dono do plano.
   *
   * @returns {Object} Mensagem de confirmação.
   */
  async excluir(planoId, usuarioId) {

    await PlanoAlimentarRepository.excluir(planoId, usuarioId);

    return { mensagem: 'Plano excluído com sucesso' };
  }

}

export default new PlanoAlimentarService();