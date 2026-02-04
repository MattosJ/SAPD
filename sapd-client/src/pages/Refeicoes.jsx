import { useState, useEffect} from 'react';
import { Trash2, Plus } from 'lucide-react';
import api from "../services/api";
import Selector from '../components/layout/Selector';
import ConfirmacaoRefeicaoPopup from '../components/refeicao/ConfirmacaoRefeicaoPopup';

export default function Refeicoes() {
  const [refeicoes, setRefeicoes] = useState([
    {id: 1, desc: 'Café da Manhã', hora: '07:30', carbs: 45},
    {id: 2, desc: 'Almoço', hora: '12:30', carbs: 70},
  ]);

  const [novaRefeicao, setNovaRefeicao] = useState([]);

  const [alimentos, setAlimentos] = useState([
    {id: 1, nome: 'Pão Integral', medida: '1 fatia', carboidratos: 12, proteinas: 3, gorduras: 1.5  , kcal: 70, tipo: 'Carboidrato' },
    {id: 2, nome: 'Ovo Cozido', medida: '1 unidade', carboidratos: 1, proteinas: 6, gorduras: 5  , kcal: 78, tipo: 'Proteína' },
  ]);

  const [modalConfirmacao, setModalConfirmacao] = useState(false);

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

      const novaRefeicao = response.data;
      setRefeicoes(prev => [...prev, novaRefeicao]);
      
    } catch (error) {
      console.error('Erro ao adicionar refeição:', error);
    }
  }

  const handleAlimentosChange = (itensSelecionados) => {
      setNovaRefeicao(itensSelecionados);
  }

  const handleSalvarFinal = () => {
    setModalConfirmacao(false);
    adicionarRefeicao();
  };

  function transformarHora(dataHora) {
    const data = new Date(dataHora);
    const horas = data.getHours().toString().padStart(2, '0');
    const minutos = data.getMinutes().toString().padStart(2, '0');
    const dia = data.getDay().toString().padStart(2, '0');
    const mes = (data.getMonth() + 1).toString().padStart(2, '0');
    const ano = data.getFullYear();
    return `${horas}:${minutos} - ${dia}/${mes}/${ano}`;
  }

  return (
    <div>
      <h2 className="page-title">Registro de Refeições</h2>
      
      <div className="card">
        <div style={{display: 'flex', gap: '10px'}}>
          <Selector 
          alimentos={alimentos}
          onSelectionChange={handleAlimentosChange} />

          <button className="btn btn-primary" onClick={() => setModalConfirmacao(true)}><Plus size={20}/></button>

          <ConfirmacaoRefeicaoPopup 
            isOpen={modalConfirmacao}
            onClose={() => setModalConfirmacao(false)}
            onConfirm={handleSalvarFinal}
            itens={novaRefeicao}
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
                  {
                  //<strong>{ref.desc}</strong>
                  //<br/><small>{ref.hora} - {ref.carbs} Carbs</small>
                  }
                  <strong>{ref.tipo}</strong>
                  <br/><small>{transformarHora(ref.data_hora)}</small>
                </div>
                <Trash2 size={18} color="red" style={{cursor: 'pointer'}} />
              </li>
            ))}
          </ul>
          :
          <p style={{color: '#999', fontStyle: 'italic'}}>Nenhuma refeição registrada.</p>
          }
        </div>
        
        <div className="card">
          <h3>Lembretes de Alimentação</h3>
          <p style={{color: '#999', fontStyle: 'italic'}}>Nenhum lembrete ativo.</p>
          <button className="btn btn-primary" style={{marginTop: '10px'}}>+ Novo Lembrete</button>
        </div>
      </div>
    </div>
  );
}