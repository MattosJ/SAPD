import { useState, useEffect} from 'react';
import { Trash2, Plus } from 'lucide-react';
import api from "../services/api";
import Selector from '../components/layout/Selector';
import ConfirmacaoRefeicaoPopup from '../components/refeicao/ConfirmacaoRefeicaoPopup';
import ConfirmPopup from '../components/layout/ConfirmPopup';

export default function Refeicoes() {
  const [refeicoes, setRefeicoes] = useState([
    {id: 1, tipo: 'Café da Manhã', hora: '07:30', carbs: 45},
    {id: 2, tipo: 'Almoço', hora: '12:30', carbs: 70},
  ]);


  const [modalConfirmacaoItem, setModalConfirmacaoItem] = useState(false);
  const [itemSelecionado, setItemSelecionado] = useState(null);

  const [novaRefeicao, setNovaRefeicao] = useState({tipo: '', alimentos: []});

  const [alimentos, setAlimentos] = useState([
    {id: 1, nome: 'Pão Integral', medida: '1 fatia', carboidratos: 12, proteinas: 3, gorduras: 1.5  , kcal: 70, tipo: 'Carboidrato' },
    {id: 2, nome: 'Ovo Cozido', medida: '1 unidade', carboidratos: 1, proteinas: 6, gorduras: 5  , kcal: 78, tipo: 'Proteína' },
  ]);

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
            console.log(data);
        } catch (error) {
            console.error('Erro ao buscar dados:', error);
        }
    };

    const buscarRefeicoes = async () => {
        try {
            const response = await api.get('/refeicoes');

            const data = response.data;
            setRefeicoes(data);
            console.log(data);
        } catch (error) {
            console.error('Erro ao buscar dados:', error);
        }
    };

    buscarRefeicoes();

    buscarAlimentos();
  }, [])


  async function adicionarRefeicao() {
    try {
      const response = await api.post('/refeicoes', {
        refeicao: novaRefeicao
      });

      const novaRefeicaoReturn = response.data;
      setRefeicoes(prev => [...prev, novaRefeicaoReturn]);
      
    } catch (error) {
      console.error('Erro ao adicionar refeição:', error.response);
    }
  }

  async function removerRefeicao(id) {
    try {
      await api.delete(`/refeicoes/${id}`);

      setRefeicoes(refeicoes.filter(r => r.id !== id));
      
    } catch (error) {
      console.error('Erro ao remover refeição:', error.response);
    }
  }

  const handleAlimentosChange = (value, tipo) => {
      setNovaRefeicao(refeicao => (tipo == 'a' ? { ...refeicao, alimentos: value } : {...refeicao, tipo: value}));
  }

  const handleSalvarFinal = () => {
    console.log(novaRefeicao);
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
            <input className="input-field" type="text" placeholder="Descrição" style={{fontSize: '2rem', textAlign: 'center', margin: '20px 0'}} value={novaRefeicao.tipo} onChange={(e) => handleAlimentosChange(e.target.value, 'b')}/>

            <Selector 
            alimentos={alimentos}
            onSelectionChange={(value) => handleAlimentosChange(value, 'a')} />
          </div>

          <button className="btn btn-primary" onClick={() => setModalConfirmacao(true)}><Plus size={20}/></button>

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
                <div>
                  
                  <strong>{ref.tipo}</strong>
                  <br/><small>{transformarHora(ref.data_hora)}</small>
                </div>
                <Trash2 onClick={() => confirmacaoItem(ref.id)} size={18} color="red" style={{cursor: 'pointer'}} />
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