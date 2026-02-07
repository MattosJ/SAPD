import RegistroInsulinaRepository from '../repositories/RegistroInsulinaRepository.js';
import RegistroInsulina from '../entities/RegistroInsulina.js';
import { formatarDataHora } from '../utils/formatarDataHora.js';

class RegistroInsulinaService {
  
  //Formata data_hora em data e hora
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

    //Cria o registro de insulina   
    async criar(dados) {
  
        const registro = await RegistroInsulinaRepository.criar(dados);
        //Formatar a coluna de data_hora para data e hora
        const { data, hora } = formatarDataHora(registro.data_hora);

        return {
          id: registro.id,
          usuario_id: registro.usuario_id,
          quantidadeInsulina: registro.quantidade_insulina,
          tipo: registro.tipo,
          data,
          hora,
          momento: registro.momento,
          observacoes: registro.observacoes
        };

      }

  //Lista todos registros de insulina    
  async listar(usuario_id) {
  
    const registros = RegistroInsulinaRepository.listarPorUsuario(usuario_id);
    return (await registros).map(r => this.formatar(r));
  }

  //Busca Insulina especifica do id
  async buscar(id, usuario_id) {
    const registro = await RegistroInsulinaRepository.buscarPorId(id, usuario_id);
    if (!registro) throw new Error('Registro não encontrado');
    return registro;
  }

  //Atualiza o registro da insulina
  async atualizar(id, usuario_id, dados) {
    console.log(dados);
    const atualizado = await RegistroInsulinaRepository.atualizar(id, usuario_id, dados);
    if (!atualizado) throw new Error('Registro não encontrado');
    return atualizado;
  }

  //Deleta o registro da insulina
  async excluir(id, usuario_id) {
    await RegistroInsulinaRepository.excluir(id, usuario_id);
  }
}

export default new RegistroInsulinaService();
