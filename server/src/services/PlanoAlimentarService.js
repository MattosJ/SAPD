import PlanoAlimentarRepository from '../repositories/PlanoAlimentarRepository.js';

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

  async listar(usuarioId) {
    return PlanoAlimentarRepository.listarPorUsuario(usuarioId);
  }
}

export default new PlanoAlimentarService();
