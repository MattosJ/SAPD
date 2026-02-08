import RefeicaoRepository from '../repositories/RefeicaoRepository.js';

function agruparRefeicao(rows) {

  if (!rows.length) return null;

  const refeicao = {
    id: rows[0].id,
    tipo: rows[0].tipo,
    data_hora: rows[0].data_hora,
    alimentos: []
  };

  rows.forEach(r => {
    if (r.alimento_id) {
      refeicao.alimentos.push({
        id: r.alimento_id,
        nome: r.nome,
        quantidade: r.quantidade,
        kcal: r.kcal,
        carboidratos: r.carboidratos,
        proteinas: r.proteinas,
        gorduras: r.gorduras
      });
    }
  });

  return refeicao;
}




class RefeicaoService {
  //Cria uma refeição
  async criar(dados){
    const rows = await RefeicaoRepository.criar(dados);
    const resultado = agruparRefeicao(rows);

    return resultado;
    
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
