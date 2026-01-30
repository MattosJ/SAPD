import { useState, useEffect } from 'react';
import { Trash2, Edit, Bell } from 'lucide-react';
import api from "../services/api";
import AtualizarInsulinaPopup from '../components/insulina/AtualizarInsulinaPopup';

export default function Insulina() {
  const [registros, setRegistros] = useState([
    {id: 1, tipo: 'Basal', quantidadeInsulina: 20, data: '01/02/2026', hora: '22:00', momento: 'Noite', observacao: 'Antes de dormir' },
    {id: 2, tipo: 'Rápida', quantidadeInsulina: 10, data: '02/02/2026', hora: '12:30', momento: 'Almoço', observacao: 'Após refeição' },
  ]);
  
  const [tipoInsulina, setTipoInsulina] = useState('');
  const [quantidadeInsulina, setQuantidadeInsulina] = useState('');
  const [momento, setMomento] = useState('');
  const [observacao, setObservacao] = useState('');

  const [modalAtualizarInsulina, setModalAtualizarInsulina] = useState(false);
  const [insulinaSelecionada, setInsulinaSelecionada] = useState(null);

  const [lembretes, setLembretes] = useState([
    { id: 1, msg: 'Aplicar Basal', hora: '22:00' }
  ]);

  async function deleteRegistro(id) {
    try {
      await api.delete(`/insulina/${id}`);

      setRegistros(registros.filter(r => r.id !== id));
      
    } catch (error) {
      console.error('Erro ao deletar registro de insulina:', error.response);
    }
  }

  useEffect(() => {
    const buscarDados = async () => {
        try {
            const response = await api.get('/insulina');
            const data = response.data;
            setRegistros(data);
            console.log(data);
        } catch (error) {
            console.error('Erro ao buscar dados:', error.response);
        }
    };

    buscarDados();
  }, [])

  async function handleAddRegistro() {
    try {
      const response = await api.post('/insulina', 
        {
          tipo: tipoInsulina,
          quantidade_insulina: quantidadeInsulina,
          momento: momento,
          observacoes: observacao,
        }
      );

      if (response.ok) {
        const novoRegistro = response.data;
        setRegistros([...registros, novoRegistro]);
      }
    } catch (error) {
      console.error('Erro ao adicionar registro de insulina:', error.response);
    }
  }

  return (
    <div className="grid-2">
      <AtualizarInsulinaPopup
        isOpen={modalAtualizarInsulina}
        onClose={() => setModalAtualizarInsulina(false)}
        insulinaData={insulinaSelecionada}
        atualizarInsulina={(insulina) => setRegistros(registros.map(r => r.id === insulina.id ? insulina : r))}
      />

      {/* Coluna da Esquerda: Registros */}
      <div>
        <h2 className="page-title">Aplicação de Insulina</h2>
        
        {/* Formulário de Registro */}
        <div className="card">
          <h3>Nova Aplicação</h3>

          <div className="grid-2" style={{marginTop: '10px'}}>
            <input className="input-field" placeholder="Tipo (ex: Basal)" value={tipoInsulina} onChange={(e) => setTipoInsulina(e.target.value)} />

            <input className="input-field" placeholder="Quantidade (unidades)" type="number" value={quantidadeInsulina} onChange={(e) => setQuantidadeInsulina(e.target.value)} />

            <input className="input-field" placeholder="Momento (ex: Manhã)" value={momento} onChange={(e) => setMomento(e.target.value)} />

            <input className="input-field" placeholder="Observação" type="text" value={observacao} onChange={(e) => setObservacao(e.target.value)} />

          </div>
          <button className="btn btn-primary" style={{marginTop: '10px', width: '100%'}} onClick={handleAddRegistro}>Registrar</button>
        </div>

        {/* Histórico */}
        <div className="card">
          <h3>Histórico de Aplicações</h3>
          {registros.length > 0 ?
          <ul className="history-list">
            {registros.map(reg => (
              <li key={reg.id} className="history-item">
                <div>

                  <strong>{reg.tipo}</strong> - {reg.quantidadeInsulina}

                  <div style={{fontSize: '0.8rem', color: '#777'}}>
                    {reg.data} às {reg.hora}
                  </div>

                  <div style={{fontSize: '0.8rem', color: '#777'}}>
                    <strong> {reg.momento} </strong> - {reg.observacao}
                  </div>
                </div>

                <div>
                  <button className="btn" style={{padding: '5px'}} onClick={() => {setInsulinaSelecionada(reg); setModalAtualizarInsulina(true);}}><Edit size={16} /></button>

                  <button className="btn" style={{padding: '5px', color: 'red'}} onClick={() => deleteRegistro(reg.id)}><Trash2 size={16} /></button>

                </div>
              </li>
            ))}
          </ul>
          :
          <p style={{color: '#999', fontStyle: 'italic'}}>Nenhum registro de insulina encontrado.</p>
          }
        </div>
      </div>

      {/* Coluna da Direita: Lembretes */}
      <div>
        <h2 className="page-title">Lembretes</h2>
        <div className="card" style={{borderLeft: '5px solid #f39c12'}}>
          <h3>Criar Lembrete <Bell size={16}/></h3>
          <div style={{display: 'flex', gap: '10px', marginTop: '10px'}}>
            <input className="input-field" type="time" />

            <input className="input-field" placeholder="Descrição" />

          </div>
          <button className="btn btn-primary" style={{marginTop: '10px'}}>Salvar Lembrete</button>
        </div>

        <div className="card">
          <h3>Meus Lembretes</h3>
          <ul className="history-list">
            {lembretes.map(lem => (
              <li key={lem.id} className="history-item">
                <span>⏰ {lem.hora} - {lem.msg}</span>
                <Trash2 size={16} style={{cursor: 'pointer', color: '#888'}} />
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}