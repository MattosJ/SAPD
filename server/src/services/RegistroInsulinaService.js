import RegistroInsulinaRepository from '../repositories/RegistroInsulinaRepository.js';
import { formatarDataHora } from '../utils/formatarDataHora.js';

/**
 * Service responsável pelas regras de negócio relacionadas
 * aos registros de aplicação de insulina.
 *
 * Atua como camada intermediária entre Controller e Repository,
 * garantindo validações, formatação de dados e organização
 * das respostas da API.
 */
class RegistroInsulinaService {

  /**
   * Cria um novo registro de aplicação de insulina
   *
   * Valida os dados recebidos e delega a persistência ao Repository.
   *
   * @param {Object} dados - Dados do registro
   * @param {number} dados.usuario_id - ID do usuário
   * @param {number} dados.quantidade_insulina - Quantidade aplicada (UI)
   * @param {string} dados.tipo - Tipo de insulina aplicada
   * @param {string|Date} dados.data_hora - Data e hora da aplicação
   * @param {string} [dados.momento] - Momento da aplicação (ex: pré-refeição)
   * @param {string} [dados.observacoes] - Observações adicionais
   *
   * @throws {Error} Caso dados obrigatórios estejam ausentes
   *
   * @returns {Promise<Object>} Registro criado
   */
  async criar(dados) {

    if (!dados.quantidade_insulina)
      throw new Error('Quantidade de insulina é obrigatória');

    if (!dados.tipo)
      throw new Error('Tipo de insulina é obrigatório');

    return RegistroInsulinaRepository.criar(dados);
  }


  /**
   * Lista todos registros de insulina do usuário
   *
   * @param {number} usuarioId - ID do usuário autenticado
   *
   * @returns {Promise<Array<Object>>} Lista de registros
   */
  async listar(usuarioId) {
    return RegistroInsulinaRepository.listarPorUsuario(usuarioId);
  }


  /**
   * Busca registro específico de aplicação de insulina
   *
   * @param {number} id - ID do registro
   * @param {number} usuarioId - ID do usuário
   *
   * @throws {Error} Caso registro não seja encontrado
   *
   * @returns {Promise<Object>}
   */
  async buscar(id, usuarioId) {

    const registro =
      await RegistroInsulinaRepository.buscarPorId(id, usuarioId);

    if (!registro)
      throw new Error('Registro não encontrado');

    return registro;
  }


  /**
   * Atualiza um registro de aplicação de insulina
   *
   * @param {number} id - ID do registro
   * @param {number} usuarioId - ID do usuário
   * @param {Object} dados - Dados para atualização
   *
   * @throws {Error} Caso registro não exista
   *
   * @returns {Promise<Object>} Registro atualizado
   */
  async atualizar(id, usuarioId, dados) {

    const atualizado =
      await RegistroInsulinaRepository.atualizar(id, usuarioId, dados);

    if (!atualizado)
      throw new Error('Registro não encontrado');

    return atualizado;
  }


  /**
   * Remove um registro de aplicação de insulina
   *
   * @param {number} id - ID do registro
   * @param {number} usuarioId - ID do usuário
   *
   * @returns {Promise<void>}
   */
  async excluir(id, usuarioId) {
    await RegistroInsulinaRepository.excluir(id, usuarioId);
  }


  /**
   * Lista registros de insulina com formatação de data e hora
   *
   * Método auxiliar utilizado quando a aplicação precisa
   * apresentar os registros organizados para exibição.
   *
   * @param {number} usuarioId - ID do usuário
   *
   * @returns {Promise<Array<Object>>}
   */
  async listarFormatado(usuarioId) {

    const registros =
      await RegistroInsulinaRepository.listarPorUsuario(usuarioId);

    return registros.map(reg => {

      const { data, hora } = formatarDataHora(reg.data_hora);

      return {
        ...reg,
        data,
        hora
      };
    });
  }

}

export default new RegistroInsulinaService();
