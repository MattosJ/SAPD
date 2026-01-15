class Usuario {
  constructor({ id, nome, email, senha }) {
    this.id = id;
    this.nome = nome;
    this.email = email;
    this.senha = senha;

    this.validar();
  }

  validar() {
    if (!this.nome || this.nome.length < 3) {
      throw new Error('Nome inválido');
    }

    if (!this.email || !this.email.includes('@')) {
      throw new Error('Email inválido');
    }

    if (!this.senha || this.senha.length < 6) {
      throw new Error('Senha deve ter no mínimo 6 caracteres');
    }
  }
}

export default Usuario;
