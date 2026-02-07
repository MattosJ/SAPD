import AlimentoRepository from '../repositories/AlimentoRepository.js';

/**
 * Service responsável pelas regras de negócio relacionadas
 * aos alimentos.
 *
 * Atua como camada intermediária entre o Controller e o Repository,
 * realizando validações e organizando o fluxo das operações.
 */
class AlimentoService {

  /**
   * Cria um novo alimento após validar os dados de entrada.
   *
   * Realiza validação básica garantindo que o nome do alimento
   * seja informado antes de persistir no banco de dados.
   *
   * @param {Object} dados Dados do alimento.
   *
   * @returns {Object} Alimento criado.
   *
   * @throws {Error} Caso o nome do alimento não seja informado.
   */
  async criar(dados) {
    if (!dados.nome) throw new Error('Nome do alimento é obrigatório');

    return AlimentoRepository.criar(dados);
  }

  /**
   * Lista todos os alimentos cadastrados no sistema.
   *
   * @returns {Array<Object>} Lista de alimentos.
   */
  async listar() {
    return AlimentoRepository.listar();
  }

  /**
   * Atualiza os dados de um alimento específico.
   *
   * @param {number} id ID do alimento.
   * @param {Object} dados Novos dados do alimento.
   *
   * @returns {Object} Alimento atualizado.
   */
  async atualizar(id, dados) {
    return AlimentoRepository.atualizar(id, dados);
  }

  /**
   * Remove um alimento do sistema.
   *
   * @param {number} id ID do alimento.
   */
  async excluir(id) {
    await AlimentoRepository.excluir(id);
  }
}

export default new AlimentoService();
