class Usuario {
  constructor({ id, nome, email, senha }) {
    this.nome_completo = dados.nome_completo;
    this.email = dados.email;
    this.senha = dados.senha;
    this.data_nascimento = dados.data_nascimento;
    this.tipo_diabetes = dados.tipo_diabetes;
    this.peso = dados.peso;
    this.altura = dados.altura;
    this.foto_perfil = dados.foto_perfil;
    this.status_conta = dados.status_conta || 'ATIVA';

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
