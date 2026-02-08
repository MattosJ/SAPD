import { useState, useEffect} from 'react';
import { Trash2, Plus } from 'lucide-react';
import api from "../services/api";
import Selector from '../components/layout/Selector';
import ConfirmacaoRefeicaoPopup from '../components/refeicao/ConfirmacaoRefeicaoPopup';
import ConfirmPopup from '../components/layout/ConfirmPopup';

export default function Refeicoes() {

  const [refeicoes, setRefeicoes] = useState([]);

  const [modalConfirmacaoItem, setModalConfirmacaoItem] = useState(false);
  const [itemSelecionado, setItemSelecionado] = useState(null);

  const [novaRefeicao, setNovaRefeicao] = useState({tipo: '', alimentos: []});

  const [alimentos, setAlimentos] = useState([]);

  const [modalConfirmacao, setModalConfirmacao] = useState(false);

  const confirmacaoItem = (id) => {
    setItemSelecionado(id);
    setModalConfirmacaoItem(true);
  }

  useEffect(() => {
    const buscarAlimentos = async () => {
        try {
            const response = await api.get('/alimentos');
       
            const data = response.data;
            setAlimentos(data);
            console.log('Alimentos:', data);
        } catch (error) {
            console.error('Erro ao buscar alimentos:', error);
        }
    };

    const buscarRefeicoesComAlimentos = async () => {
        try {
            // Buscar todas as refeições
            const responseRefeicoes = await api.get('/refeicoes');
            const refeicoesData = responseRefeicoes.data;

            console.log('Refeições recebidas:', refeicoesData);

            // Para cada refeição, buscar seus alimentos
            const refeicoesComAlimentos = await Promise.all(
                refeicoesData.map(async (refeicao) => {
                    try {
                        const responseAlimentos = await api.get(`/refeicaoAlimentos/${refeicao.id}`);
                        console.log(`Alimentos da refeição ${refeicao.id}:`, responseAlimentos.data);
                        return {
                            ...refeicao,
                            alimentos: responseAlimentos.data || []
                        };
                    } catch (error) {
                        console.error(`Erro ao buscar alimentos da refeição ${refeicao.id}:`, error);
                        return {
                            ...refeicao,
                            alimentos: []
                        };
                    }
                })
            );

            console.log('Refeições com alimentos:', refeicoesComAlimentos);
            setRefeicoes(refeicoesComAlimentos);
        } catch (error) {
            console.error('Erro ao buscar refeições:', error);
        }
    };

    buscarRefeicoesComAlimentos();
    buscarAlimentos();
  }, [])


  async function adicionarRefeicao() {
    try {
      const response = await api.post('/refeicoes', {
        refeicao: novaRefeicao
      });

      const novaRefeicaoReturn = response.data;
      
      // Buscar refeições novamente para atualizar a lista com alimentos
      const responseRefeicoes = await api.get('/refeicoes');
      const refeicoesData = responseRefeicoes.data;

      const refeicoesComAlimentos = await Promise.all(
          refeicoesData.map(async (refeicao) => {
              try {
                  const responseAlimentos = await api.get(`/refeicaoAlimentos/${refeicao.id}`);
                  return {
                      ...refeicao,
                      alimentos: responseAlimentos.data || []
                  };
              } catch (error) {
                  return {
                      ...refeicao,
                      alimentos: []
                  };
              }
          })
      );

      setRefeicoes(refeicoesComAlimentos);
      
      // Limpar formulário
      setNovaRefeicao({tipo: '', alimentos: []});
      
    } catch (error) {
      console.error('Erro ao adicionar refeição:', error.response);
    }
  }

  async function removerRefeicao(id) {
    try {
      await api.delete(`/refeicoes/${id}`);

      setRefeicoes(refeicoes.filter(r => r.id !== id));
      setModalConfirmacaoItem(false);
      
    } catch (error) {
      console.error('Erro ao remover refeição:', error.response);
    }
  }

  const handleAlimentosChange = (value, tipo) => {
      setNovaRefeicao(refeicao => (tipo == 'a' ? { ...refeicao, alimentos: value } : {...refeicao, tipo: value}));
  }

  const handleSalvarFinal = () => {
    console.log('Nova refeição:', novaRefeicao);
    setModalConfirmacao(false);
    adicionarRefeicao();
  };

  function transformarHora(dataHora) {
    const data = new Date(dataHora);
    const horas = data.getHours().toString().padStart(2, '0');
    const minutos = data.getMinutes().toString().padStart(2, '0');
    const dia = data.getDate().toString().padStart(2, '0');
    const mes = (data.getMonth() + 1).toString().padStart(2, '0');
    const ano = data.getFullYear();
    return `${horas}:${minutos} - ${dia}/${mes}/${ano}`;
  }

  return (
    <div>
      <ConfirmPopup
        isOpen={modalConfirmacaoItem}
        onClose={() => setModalConfirmacaoItem(false)}
        onConfirm={() => removerRefeicao(itemSelecionado)}
        msg={'Tem certeza que deseja excluir esse registro?\nEssa ação não poderá ser desfeita.'}
        titulo={'Excluir Registro de Refeição'}
      />
      <h2 className="page-title">Registro de Refeições</h2>
      
      <div className="card">
        <div style={{display: 'flex', gap: '10px'}}>
          
          <div style={{width: '100%'}}>
            <input 
              className="input-field" 
              type="text" 
              placeholder="Descrição" 
              style={{fontSize: '2rem', textAlign: 'center', margin: '20px 0'}} 
              value={novaRefeicao.tipo} 
              onChange={(e) => handleAlimentosChange(e.target.value, 'b')}
            />

            <Selector 
              alimentos={alimentos}
              onSelectionChange={(value) => handleAlimentosChange(value, 'a')} 
            />
          </div>

          <button className="btn btn-primary" onClick={() => setModalConfirmacao(true)}>
            <Plus size={20}/>
          </button>

          <ConfirmacaoRefeicaoPopup 
            isOpen={modalConfirmacao}
            onClose={() => setModalConfirmacao(false)}
            onConfirm={handleSalvarFinal}
            itens={novaRefeicao}
            alimentos={alimentos}
          />
        </div>
      </div>

      <div className="grid-2">
        <div className="card">
          <h3>Refeições</h3>
          {refeicoes.length > 0 ?
          <ul className="history-list">
            {refeicoes.map(ref => (
              <li key={ref.id} className="history-item">
                <div style={{flex: 1}}>
                  {/* TIPO DA REFEIÇÃO */}
                  <strong>{ref.tipo || 'Sem descrição'}</strong>
                  <br/>
                  <small>{transformarHora(ref.data_hora)}</small>
                  
                  {/* EXIBIR OS ALIMENTOS */}
                  {ref.alimentos && ref.alimentos.length > 0 && (
                    <div style={{marginTop: '10px', paddingTop: '8px', borderTop: '1px solid #eee'}}>
                      <small style={{color: '#666', fontWeight: 'bold', display: 'block', marginBottom: '5px'}}>
                        Alimentos ({ref.alimentos.length}):
                      </small>
                      {ref.alimentos.map((alimento, index) => (
                        <div key={index} style={{fontSize: '0.85em', color: '#666', marginTop: '4px', paddingLeft: '10px'}}>
                          • <strong>{alimento.nome}</strong> - {alimento.quantidade}g
                          <br/>
                          <span style={{marginLeft: '12px', color: '#999', fontSize: '0.9em'}}>
                            {alimento.kcal} kcal | {alimento.carboidratos}g carb | {alimento.proteinas}g prot | {alimento.gorduras}g gord
                          </span>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
                <Trash2 
                  onClick={() => confirmacaoItem(ref.id)} 
                  size={18} 
                  color="red" 
                  style={{cursor: 'pointer'}} 
                />
              </li>
            ))}
          </ul>
          :
          <p style={{color: '#999', fontStyle: 'italic'}}>Nenhuma refeição registrada.</p>
          }
        </div>
      </div>
    </div>
  );
}