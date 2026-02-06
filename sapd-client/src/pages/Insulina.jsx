import { useState, useEffect, useRef } from 'react';
import { Trash2, Edit, Bell } from 'lucide-react';
import api from "../services/api";
import AtualizarInsulinaPopup from '../components/insulina/AtualizarInsulinaPopup';

export default function Insulina() {

  const reloadRef = useRef(false);

  const [registros, setRegistros] = useState([
  ]);
  
  const [tipoInsulina, setTipoInsulina] = useState('');
  const [quantidadeInsulina, setQuantidadeInsulina] = useState('');
  const [momento, setMomento] = useState('');
  const [observacao, setObservacao] = useState('');

  const [modalAtualizarInsulina, setModalAtualizarInsulina] = useState(false);
  const [insulinaSelecionada, setInsulinaSelecionada] = useState(null);


  async function deleteRegistro(id) {
    try {
      await api.delete(`/insulina/${id}`);

      setRegistros(registros.filter(r => r.id !== id));
      
    } catch (error) {
      console.error('Erro ao deletar registro de insulina:', error.response);
    }
  }

  useEffect(() => {
    if (reloadRef.current) return;
    reloadRef.current = true;

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

      
      const novoRegistro = response.data;
      console.log(response.data);
      setRegistros([...registros, novoRegistro]);
      
    } catch (error) {
      console.error('Erro ao adicionar registro de insulina:', error.response);
    }
  }

  return (
    <div className="container-flex">
      <AtualizarInsulinaPopup
        isOpen={modalAtualizarInsulina}
        onClose={() => setModalAtualizarInsulina(false)}
        insulinaData={insulinaSelecionada}
        atualizarInsulina={(insulina) => setRegistros(registros.map(r => r.id === insulina.id ? insulina : r))}
      />

      {/* Coluna da Esquerda: Registros */}
      <div style={{height: '100%', width: '100%'}}>
        <h2 className="page-title">Aplicação de Insulina</h2>
        
        {/* Formulário de Registro */}
        <div className='grid-2' style={{gridTemplateColumns: '0.5fr 1fr'}}>
          
          <div className="card" >
            <h3>Nova Aplicação</h3>

            <div style={{marginTop: '10px', gap: '10px', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center'}}>
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
                <li key={`${reg.data}-${reg.hora}`} className="history-item">
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
      </div>

    </div>
  );
}