class RegistroGlicemia {
  constructor({ id, valor, dataHora, momento, observacao, usuarioId }) {
    this.id = id;
    this.valor = valor;
    this.dataHora = new Date(dataHora);
    this.momento = momento;
    this.observacao = observacao;
    this.usuarioId = usuarioId;

    this.validar();
  }

  validar() {
    if (!this.valor || this.valor <= 0) {
      throw new Error('Valor de glicemia inválido');
    }

    if (this.dataHora > new Date()) {
      throw new Error('Data da medição não pode ser futura');
    }

    if (!this.usuarioId) {
      throw new Error('Registro precisa estar associado a um usuário');
    }
  }
}

export default RegistroGlicemia;
