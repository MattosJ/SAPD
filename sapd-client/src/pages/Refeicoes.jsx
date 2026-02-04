import { useState, useEffect} from 'react';
import { Trash2, Plus } from 'lucide-react';
import Selector from '../components/layout/Selector';
import ConfirmacaoRefeicaoPopup from '../components/refeicao/ConfirmacaoRefeicaoPopup';

export default function Refeicoes() {
  const [refeicoes, setRefeicoes] = useState([]);

  const [novaRefeicao, setNovaRefeicao] = useState([]);

  const [alimentos, setAlimentos] = useState([]);

  const [modalConfirmacao, setModalConfirmacao] = useState(false);

  useEffect(() => {
    const buscarAlimentos = async () => {
        try {
            const response = await fetch('http://localhost:3000/alimentos');
            const data = await response.json();
            setAlimentos(data);
            console.log(data);
        } catch (error) {
            console.error('Erro ao buscar dados:', error);
        }
    };

    const buscarRefeicoes = async () => {
        try {
            const response = await fetch('http://localhost:3000/refeicoes');
            const data = await response.json();
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
      const response = await fetch('http://localhost:3000/refeicoes', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({refeicao: novaRefeicao}),
      });

      if (response.ok) {
        const novaRefeicao = await response.json();
        setRefeicoes(prev => [...prev, novaRefeicao]);
      }
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
                  <strong>{ref.desc}</strong>
                  <br/><small>{ref.hora} - {ref.carbs} Carbs</small>
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