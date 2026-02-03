import RegistroInsulinaRepository from '../repositories/RegistroInsulinaRepository.js';
import RegistroInsulina from '../entities/RegistroInsulina.js';

class RegistroInsulinaService {
  formatar(insulina) {
    const dataObj = new Date(insulina.data_hora);

    return {
      id:insulina.id,
      tipo: insulina.tipo,
      quantidadeInsulina: Number(insulina.quantidade_insulina),
      data: dataObj.toLocaleDateString('pt-BR'),
      hora: dataObj.toLocaleTimeString('pt-BR', {
        hour: '2-digit',
        minute: '2-digit'
      }),
      momento: insulina.momento,
      observacao: insulina.observacoes
    };
  }
  async criar(dados) {
    const registro = new RegistroInsulina({
      ...dados,
      data_hora: new Date()
  });

  return RegistroInsulinaRepository.criar(registro);
  }

  async listar(usuario_id) {
  
    const registros = RegistroInsulinaRepository.listarPorUsuario(usuario_id);
    return (await registros).map(r => this.formatar(r));
  }

  async buscar(id, usuario_id) {
    const registro = await RegistroInsulinaRepository.buscarPorId(id, usuario_id);
    if (!registro) throw new Error('Registro não encontrado');
    return registro;
  }

  async atualizar(id, usuario_id, dados) {
    const atualizado = await RegistroInsulinaRepository.atualizar(id, usuario_id, dados);
    if (!atualizado) throw new Error('Registro não encontrado');
    return atualizado;
  }

  async excluir(id, usuario_id) {
    await RegistroInsulinaRepository.excluir(id, usuario_id);
  }
}

export default new RegistroInsulinaService();
