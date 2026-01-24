export default class RegistroGlicemia {
  constructor({ valor, data_hora, momento, observacao, usuario_id }) {
    if (!valor || valor <= 0) {
      throw new Error('Valor de glicemia inválido');
    }

    this.valor = valor;
    this.data_hora = data_hora;
    this.momento = momento;
    this.observacao = observacao;
    this.usuario_id = usuario_id;
  }
}
