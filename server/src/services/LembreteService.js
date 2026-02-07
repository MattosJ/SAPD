import LembreteRepository from '../repositories/LembreteRepository.js';

/**
 * Service responsável pelas regras de negócio relacionadas
 * aos lembretes do usuário.
 * 
 * Ele valida os dados antes de enviar para o repository,
 * garantindo integridade e consistência das informações.
 */
class LembreteService {

  /**
   * Cria um novo lembrete para o usuário
   *
   * @param {Object} dados - Dados do lembrete
   * @returns {Object} Lembrete criado
   */
  async criar(dados) {

    // Obtém a data atual do sistema
    const agora = new Date();

    // Converte a data do lembrete para objeto Date
    const dataLembrete = new Date(dados.data_hora);

    // Define os tipos válidos de lembrete permitidos pelo sistema
    const TIPOS_VALIDOS = ['refeicao', 'insulina', 'glicemia'];

    /**
     * Validação para impedir criação de lembretes no passado
     */
    if (dataLembrete < agora) {
      throw new Error('Não é permitido criar lembrete no passado');
    }

    /**
     * Validação para garantir que o tipo do lembrete é válido
     */
    if (!TIPOS_VALIDOS.includes(dados.tipo)) {
      throw new Error('Tipo de lembrete inválido');
    }

    // Envia os dados validados para o repository salvar no banco
    return LembreteRepository.criar(dados);
  }

  /**
   * Lista todos os lembretes de um usuário específico
   *
   * @param {number} usuarioId - Identificador do usuário
   * @returns {Array} Lista de lembretes
   */
  async listar(usuarioId) {
    return LembreteRepository.listarPorUsuario(usuarioId);
  }

  /**
   * Atualiza um lembrete existente
   *
   * @param {number} id - Identificador do lembrete
   * @param {number} usuarioId - Identificador do usuário
   * @param {Object} dados - Novos dados do lembrete
   * @returns {Object} Lembrete atualizado
   */
  async atualizar(id, usuarioId, dados) {

    /**
     * Valida o tipo do lembrete caso ele seja alterado
     */
    if (dados.tipo && !TIPOS_VALIDOS.includes(dados.tipo)) {
      throw new Error('Tipo de lembrete inválido');
    }

    return LembreteRepository.atualizar(id, usuarioId, dados);
  }

  /**
   * Remove um lembrete do usuário
   *
   * @param {number} id - Identificador do lembrete
   * @param {number} usuarioId - Identificador do usuário
   */
  async excluir(id, usuarioId) {
    return LembreteRepository.excluir(id, usuarioId);
  }
}

export default new LembreteService();
