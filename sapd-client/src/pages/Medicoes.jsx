import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';
import { useState, useEffect} from 'react';

export default function Medicoes() {

  const [medicoes, setMedicoes] = useState([
    { nome: '08:00', valor: 98 }, { nome: '10:00', valor: 140 },
    { nome: '12:00', valor: 110 }, { nome: '14:00', valor: 160 },
  ]);

  const [ultimosRegistros, setUltimosRegistros] = useState([
    { hora: 'Sem registros', valor: 0 }
  ]);

  const [valorMedicao, setValorMedicao] = useState(null);
  const definirMedicao = (e) => {
    setValorMedicao(e.target.value);
  };


  const [tipoSelecao, setTipoSelecao] = useState('ano');

  function selecionarTipo(tipo) {
    setTipoSelecao(tipo);
  };

  useEffect(() => {
    const buscarDados = async () => {
        try {
            const response = await fetch('http://localhost:3001/medicao');
            const data = await response.json();
            setMedicoes(data.medicoes);
            setUltimosRegistros(data.ultimosRegistros);
            console.log(data);
        } catch (error) {
            console.error('Erro ao buscar dados:', error);
        }
    };

    buscarDados();
  },[]);

  async function registrarMedicao() {
    if (!valorMedicao) return;
    try {
      const novaMedicao = { nome: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }), valor: parseFloat(valorMedicao) };
      setMedicoes([...medicoes, novaMedicao]);
      setValorMedicao(null);

      const response = await fetch('http://localhost:3001/medicoes/registrar', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(novaMedicao),
      });

      if (!response.ok) {
        throw new Error('Erro ao registrar medição');
      }
    } catch (error) {
      console.error('Erro ao registrar medição:', error);
    }
  };

  return (
    <div>
      <h2 className="page-title">Medição de Glicose</h2>
      
      <div className="grid-2">
        <div className="card">
          <h3>Nova Medição</h3>
          <input className="input-field" type="number" placeholder="Valor mg/dL" style={{fontSize: '2rem', textAlign: 'center', margin: '20px 0'}} value={valorMedicao} onChange={definirMedicao}/>
          <button className="btn btn-primary" style={{width: '100%'}} onClick={registrarMedicao}>Registrar</button>
        </div>

        <div className="card">
           <h3>Últimos Registros</h3>
           <ul className="history-list">
              {ultimosRegistros.map((item, index) => (
                <li key={index} className="history-item">
                  <span>{item.hora}</span> <strong>{item.valor} mg/dL</strong>
                </li>
              ))}
           </ul>
        </div>
      </div>

      <div className="card" style={{height: '350px', marginTop: '20px'}}>
        <div style={{height: '50px', width: '350px',display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '5px'}}>
            <button className={tipoSelecao === 'ano' ? 'btn btn-primary' : 'btn btn-secondary'} onClick={() => selecionarTipo('ano')}>Esté ano</button>
            <button className={tipoSelecao === 'meses' ? 'btn btn-primary' : 'btn btn-secondary'} onClick={() => selecionarTipo('meses')}>Últimos meses</button>
            <button className={tipoSelecao === 'mes' ? 'btn btn-primary' : 'btn btn-secondary'} onClick={() => selecionarTipo('mes')}>Esté meses</button>
        </div>
        <h3>Curva Diária</h3>
        {medicoes.length != 0 ? 
        <ResponsiveContainer width="100%" height="80%">
          <LineChart data={medicoes}>
            <XAxis dataKey="nome" />
            <YAxis />
            <Tooltip />
            <Line type="monotone" dataKey="valor" stroke="#e74c3c" strokeWidth={3} />
          </LineChart>
        </ResponsiveContainer> 
        :
        <p>Sem medições suficientes</p>
        }
      </div>
    </div>
  );
}