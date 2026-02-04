import RegistroInsulinaRepository from '../repositories/RegistroInsulinaRepository.js';
import RegistroInsulina from '../entities/RegistroInsulina.js';
import { formatarDataHora } from '../utils/formatarDataHora.js';

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
  
        const registro = await RegistroInsulinaRepository.criar(dados);

        const { data, hora } = formatarDataHora(registro.data_hora);

        return {
          id: registro.id,
          usuario_id: registro.usuario_id,
          quantidade_insulina: registro.quantidade_insulina,
          tipo: registro.tipo,
          data,
          hora,
          momento: registro.momento,
          observacoes: registro.observacoes
        };

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
    console.log(dados);
    const atualizado = await RegistroInsulinaRepository.atualizar(id, usuario_id, dados);
    if (!atualizado) throw new Error('Registro não encontrado');
    return atualizado;
  }

  async excluir(id, usuario_id) {
    await RegistroInsulinaRepository.excluir(id, usuario_id);
  }
}

export default new RegistroInsulinaService();
