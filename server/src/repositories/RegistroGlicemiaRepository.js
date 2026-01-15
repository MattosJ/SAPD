const medicoes = [];

class MedicaoGlicemiaRepository {
  salvar(medicao) {
    medicao.id = medicoes.length + 1;
    medicoes.push(medicao);
    return medicao;
  }

  listar() {
    return medicoes;
  }
}

export default new MedicaoGlicemiaRepository();
