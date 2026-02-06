import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';
import { Trash2, Check} from 'lucide-react';
import { useState, useEffect} from 'react';
import api from "../services/api";
import ConfirmPopup from '../components/layout/ConfirmPopup';

export default function Medicoes() {

  const [medicoes, setMedicoes] = useState([]);

  const [ultimosRegistros, setUltimosRegistros] = useState([]);

  const [valorMedicao, setValorMedicao] = useState('');
  const [momentoMedicao, setMomentoMedicao] = useState('');
  const [observacaoMedicao, setObservacaoMedicao] = useState('');

  const [predicoes, setPredicoes] = useState([]);

  const [modalConfirmacao, setModalConfirmacao] = useState(false);


  const confirmarPredicao = (id) => async () => {
    try {
      await api.put(`/predicoes/${id}/confirmar`, {});

      setPredicoes(predicoes.map(p => {
        if (p.id === id) {
          return { ...p, confirmacao: true };
        }
        return p;
      }));

    } catch (error) {
      console.error('Erro ao registrar predição:', error.response);
    }
  };


  const [tipoSelecao, setTipoSelecao] = useState('ano');
  const [itemSelecionado, setItemSelecionado] = useState(null);

  function selecionarTipo(tipo) {
    setTipoSelecao(tipo);
  };

  const buscarDados = async () => {
    try {
        const response = await api.get(`glicemia/${tipoSelecao}`);
        
        const data = response.data;
        setMedicoes(data.medicoes);
        setUltimosRegistros(data.ultimosRegistros);
        setPredicoes(data.predicoes);
        console.log(data);
    } catch (error) {
        console.error('Erro ao buscar dados:', error.response);
    }
  };

  const confirmacaoDeletarItem = (id) => {
    setItemSelecionado(id);
    setModalConfirmacao(true);
  }


  useEffect(() => {

    buscarDados();
  },[]);

  async function deleteMedicao(id) {
    try {
      await api.delete(`/glicemia/${id}`);

      setMedicoes(medicoes.filter(m => m.id !== id));
      
    } catch (error) {
      console.error('Erro ao deletar registro de insulina:', error.response);
    }
  }

  async function registrarMedicao() {
    if (!valorMedicao) return;
    try {
      const novaMedicao = { 
        data: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        valor: parseFloat(valorMedicao),
        momento: momentoMedicao,
        observacao: observacaoMedicao
      };
      setMedicoes([...medicoes, novaMedicao]);
      setValorMedicao(null);
      setMomentoMedicao(null);
      setObservacaoMedicao(null);

      await api.post('/glicemia', novaMedicao);

    } catch (error) {
      console.error('Erro ao registrar medição:', error.response);
    }
  };

  return (
    <div>
      <ConfirmPopup
        isOpen={modalConfirmacao}
        onClose={() => setModalConfirmacao(false)}
        onConfirm={() => deleteMedicao(itemSelecionado)}
        msg={'Tem certeza que deseja excluir essa medição?\nEssa ação não poderá ser desfeita.'}
        titulo={'Excluir Medição Glicônica'}
      />

      <h2 className="page-title">Medição de Glicose</h2>
      
      <div className="grid-2">
        <div className="card">
          <h3>Nova Medição</h3>
          <input className="input-field" type="number" placeholder="Valor mg/dL" style={{fontSize: '2rem', textAlign: 'center', margin: '20px 0'}} value={valorMedicao} onChange={(e) => setValorMedicao(e.target.value)}/>

          <input className="input-field" type="text" placeholder="Momento (ex: Jejum, Pós-refeição)" style={{fontSize: '1rem', textAlign: 'center'}} value={momentoMedicao} onChange={(e) => setMomentoMedicao(e.target.value)} />

          <input className="input-field" type="text" placeholder="Observação (opcional)" style={{fontSize: '1rem', textAlign: 'center', margin: '20px 0'}} value={observacaoMedicao} onChange={(e) => setObservacaoMedicao(e.target.value)} />

          <button className="btn btn-primary" style={{width: '100%'}} onClick={registrarMedicao}>Registrar</button>
        </div>

        <div className="card">
           <h3>Últimos Registros</h3>
           <ul className="history-list">
              {ultimosRegistros.map((item, index) => (
                <li key={index} className="history-item">
                  <span>{item.data.split('-').reverse().join('/')} | {item.hora}</span> <strong>{item.valor} mg/dL</strong>
                  <button className="btn" style={{padding: '5px', color: 'red'}} onClick={() => confirmacaoDeletarItem(item.id)}><Trash2 size={16} /></button>
                </li>
              ))}
           </ul>
        </div>
      </div>

      <div className="card" style={{height: 'auto', marginTop: '20px'}}>
        <div className='grid-2'>
          <div>
            <div style={{height: '50px', width: '350px',display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '5px'}}>
                <button className={tipoSelecao === 'ano' ? 'btn btn-primary' : 'btn btn-secondary'} onClick={() => {selecionarTipo('ano'); buscarDados()}}>Esté ano</button>

                <button className={tipoSelecao === 'meses' ? 'btn btn-primary' : 'btn btn-secondary'} onClick={() => {selecionarTipo('meses'); buscarDados()}}>Últimos meses</button>

                <button className={tipoSelecao === 'mes' ? 'btn btn-primary' : 'btn btn-secondary'} onClick={() => {selecionarTipo('mes'); buscarDados()}}>Esté meses</button>
            </div>
            <h3>Curva Diária</h3>
            {medicoes.length != 0 ? 
            <ResponsiveContainer width="100%" height="80%">
              <LineChart data={medicoes}>
                <XAxis dataKey="data" />
                <YAxis />
                <Tooltip />
                <Line type="monotone" dataKey="valor" stroke="#e74c3c" strokeWidth={3} />
              </LineChart>
            </ResponsiveContainer> 
            :
            <p style={{color: '#999', fontStyle: 'italic'}}>Sem medições suficientes</p>
            }
          </div>



          <div className="predictions-grid">
            {predicoes.map((item, index) => (
              <div key={index} className="pred-card" >
                {/* Cabeçalho com a Data */}
                <div className="pred-header">
                  <span className="pred-date">{item.data}</span>
                  {/* Badge indicador: Se tem valor real é 'Concluído', senão 'Estimativa' */}
                  <span className={`pred-badge ${item.glicemia_real > 0 ? 'done' : 'waiting'}`}>
                    {item.glicemia_real > 0 ? 'Medido' : 'Futuro'}
                  </span>
                  {item.confirmacao == false && item.glicemia_real > 0 && <button className='btn btn-primary' onClick={confirmarPredicao(item.id)}><Check size={16} /></button>}
                </div>

                <div className="pred-body">
                  
                  {/* Coluna da Previsão (Destaque) */}
                  <div className="pred-column">
                    <span className="pred-label" style={{color: '#8e44ad'}}>Previsto</span>
                    <div className="pred-value-group">
                      <span className="pred-value">{item.glicemia_prevista}</span>
                      <small>mg/dL</small>
                    </div>
                  </div>

                  {/* Divisor Visual */}
                  <div className="pred-divider"></div>

                  {/* Coluna do Valor Real */}
                  <div className="pred-column">
                    <span className="pred-label">Real</span>
                    {item.glicemia_real > 0 ? (
                      <div className="pred-value-group">
                        <span className="pred-value real">{item.glicemia_real}</span>
                        <small>mg/dL</small>
                      </div>
                    ) : (
                      <div className="pred-empty">
                        --
                      </div>
                    )}
                    
                  </div>

                </div>
                
                {/* Opcional: Mostra a diferença se já tiver medido */}
                {item.glicemia_real > 0 && (
                  <div className="pred-footer">
                    Diferença: <strong>{Math.abs(item.glicemiaPrevista - item.glicemia_real).toFixed(0)} mg/dL</strong>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
}