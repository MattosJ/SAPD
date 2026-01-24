export default class RegistroInsulina {
  constructor({ quantidade_insulina, tipo, data_hora, momento, observacoes, usuario_id }) {

    if (!quantidade_insulina || quantidade_insulina <= 0) {
      throw new Error('Quantidade de insulina inválida');
    }

    this.quantidade_insulina = quantidade_insulina;
    this.tipo = tipo;
    this.data_hora = data_hora;
    this.momento = momento;
    this.observacoes = observacoes;
    this.usuario_id = usuario_id;
  }
}
