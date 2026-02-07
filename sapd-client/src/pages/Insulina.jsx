import { useState, useEffect, useRef } from 'react';
import { Trash2, Edit } from 'lucide-react';
import api from "../services/api";
import AtualizarInsulinaPopup from '../components/insulina/AtualizarInsulinaPopup';
import ConfirmPopup from '../components/layout/ConfirmPopup';

export default function Insulina() {

  const reloadRef = useRef(false);

  const [registros, setRegistros] = useState([]);
  
  const [modalConfirmacao, setModalConfirmacao] = useState(false);
  const [itemSelecionado, setItemSelecionado] = useState(null);


  const [tipoInsulina, setTipoInsulina] = useState('');
  const [quantidadeInsulina, setQuantidadeInsulina] = useState('');
  const [momento, setMomento] = useState('');
  const [observacao, setObservacao] = useState('');


  const [errors, setErrors] = useState({});

  const [modalAtualizarInsulina, setModalAtualizarInsulina] = useState(false);
  const [insulinaSelecionada, setInsulinaSelecionada] = useState(null);


  const confirmacaoItem = (id) => {
    setItemSelecionado(id);
    setModalConfirmacao(true);
  }

  const validarFormulario = () => {
    const novosErros = {};
    let isValid = true;


    if (!tipoInsulina.trim()) {
      novosErros.tipoInsulina = "Tipo é obrigatório";
      isValid = false;
    }


    if (!quantidadeInsulina) {
      novosErros.quantidadeInsulina = "Quantidade é obrigatória";
      isValid = false;
    } else {
        if (isNaN(Number(quantidadeInsulina)) || Number(quantidadeInsulina) <= 0) {
            novosErros.quantidadeInsulina = "Valor inválido";
            isValid = false;
        }
    }

    if (!momento.trim()) {
      novosErros.momento = "Momento é obrigatório";
      isValid = false;
    }

    setErrors(novosErros);
    return isValid;
  };

  const handleTipoChange = (e) => {
    setTipoInsulina(e.target.value);
    if (errors.tipoInsulina) setErrors({...errors, tipoInsulina: null});
  }

  const handleQuantidadeChange = (e) => {
    setQuantidadeInsulina(e.target.value);
    if (errors.quantidadeInsulina) setErrors({...errors, quantidadeInsulina: null});
  }

  const handleMomentoChange = (e) => {
    setMomento(e.target.value);
    if (errors.momento) setErrors({...errors, momento: null});
  }

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
    // AQUI: Chama validação antes de enviar
    if (!validarFormulario()) return;

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
      
      setTipoInsulina('');
      setQuantidadeInsulina('');
      setMomento('');
      setObservacao('');
      setErrors({});

    } catch (error) {
      console.error('Erro ao adicionar registro de insulina:', error.response);
    }
  }

  return (
    <div className="container-flex">
      <ConfirmPopup
        isOpen={modalConfirmacao}
        onClose={() => setModalConfirmacao(false)}
        onConfirm={() => deleteRegistro(itemSelecionado)}
        msg={'Tem certeza que deseja excluir esse registro?\nEssa ação não poderá ser desfeita.'}
        titulo={'Excluir Registro de Insulina'}
      />
      <AtualizarInsulinaPopup
        isOpen={modalAtualizarInsulina}
        onClose={() => setModalAtualizarInsulina(false)}
        insulinaData={insulinaSelecionada}
        atualizarInsulina={(insulina) => setRegistros(registros.map(r => r.id === insulina.id ? insulina : r))}
      />


      <div style={{height: '100%', width: '100%'}}>
        <h2 className="page-title">Aplicação de Insulina</h2>
        

        <div className='grid-2' style={{gridTemplateColumns: '0.5fr 1fr'}}>
          
          <div className="card" >
            <h3>Nova Aplicação</h3>

            <div style={{marginTop: '10px', gap: '15px', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center'}}>
              

              <div className="form-group" style={{width: '100%'}}>
                {errors.tipoInsulina && <div className="error-popup">{errors.tipoInsulina}</div>}
                <input 
                    className="input-field" 
                    placeholder="Tipo (ex: Basal)" 
                    value={tipoInsulina} 
                    onChange={handleTipoChange}
                    style={{borderColor: errors.tipoInsulina ? '#ff4d4f' : ''}}
                />
              </div>


              <div className="form-group" style={{width: '100%'}}>
                {errors.quantidadeInsulina && <div className="error-popup">{errors.quantidadeInsulina}</div>}
                <input 
                    className="input-field" 
                    placeholder="Quantidade (unidades)" 
                    type="number" 
                    value={quantidadeInsulina} 
                    onChange={handleQuantidadeChange}
                    style={{borderColor: errors.quantidadeInsulina ? '#ff4d4f' : ''}}
                />
              </div>

              <div className="form-group" style={{width: '100%'}}>
                {errors.momento && <div className="error-popup">{errors.momento}</div>}
                <input 
                    className="input-field" 
                    placeholder="Momento (ex: Manhã)" 
                    value={momento} 
                    onChange={handleMomentoChange}
                    style={{borderColor: errors.momento ? '#ff4d4f' : ''}}
                />
              </div>

              <input 
                className="input-field" 
                placeholder="Observação" 
                type="text" 
                value={observacao} 
                onChange={(e) => setObservacao(e.target.value)} 
              />

            </div>
            <button className="btn btn-primary" style={{marginTop: '20px', width: '100%'}} onClick={handleAddRegistro}>Registrar</button>
          </div>
          

          <div className="card">
            <h3>Histórico de Aplicações</h3>
            {registros.length > 0 ?
            <ul className="history-list">
              {registros.map((reg, index) => (
                <li key={reg.id || index} className="history-item">
                  <div>
                    <strong>{reg.tipo}</strong> - {reg.quantidade_insulina || reg.quantidadeInsulina}
                    <div style={{fontSize: '0.8rem', color: '#777'}}>
                      {reg.data} às {reg.hora}
                    </div>
                    <div style={{fontSize: '0.8rem', color: '#777'}}>
                      <strong> {reg.momento} </strong> {reg.observacao ? ` - ${reg.observacao}` : ''}
                    </div>
                  </div>

                  <div>
                    <button className="btn" style={{padding: '5px'}} onClick={() => {setInsulinaSelecionada(reg); setModalAtualizarInsulina(true);}}><Edit size={16} /></button>
                    <button className="btn" style={{padding: '5px', color: 'red'}} onClick={() => confirmacaoItem(reg.id)}><Trash2 size={16} /></button>
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