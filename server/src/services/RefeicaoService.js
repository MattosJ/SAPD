import RefeicaoRepository from '../repositories/RefeicaoRepository.js';

function agruparRefeicao(dados) {

  if (!dados.length) return null;

  return {
    id: dados[0].id,
    usuario_id: dados[0].usuario_id,
    tipo: dados[0].tipo,
    data_hora: dados[0].data_hora,

    alimentos: dados.map(a => ({
      id: a.alimento_id,
      nome: a.nome,
      kcal: a.kcal,
      carboidratos: a.carboidratos,
      proteinas: a.proteinas,
      gorduras: a.gorduras,
      quantidade: a.quantidade
    }))
  };
}


class RefeicaoService {
  //Cria uma refeição
  async criar(dados){
    const rows = await RefeicaoRepository.criar(dados);
    return agruparRefeicao(rows);
  }

  //Listar refeições
  async listar(usuario_id) {
    return RefeicaoRepository.listarPorUsuario(usuario_id);
  }

  //Exlui ás refeições
  async excluir(id, usuario_id) {
    await RefeicaoRepository.excluir(id, usuario_id);
  }
}

export default new RefeicaoService();
