import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';
import { useState, useEffect } from 'react';
import RelatorioRefeicaoPopup from '../components/relatorios/RelatorioRefeicaoPopup';
import RelatorioPesoPopup from '../components/relatorios/RelatorioPesoPopup';

export default function Relatorios() {
  
    const [glicemia, setGlicemia] = useState([]);
    const [peso, setPeso] = useState([]);
    const [relatorioGlicemia, setRelatorioGlicemia] = useState([]);
    const [relatorioPeso, setRelatorioPeso] = useState([]);

    const [modalRefeicao, setModalRefeicao] = useState(false);
    const [relatorioRefeicaoSelecionado, setRelatorioRefeicaoSelecionado] = useState(null);

    const [modalPeso, setModalPeso] = useState(false);
    const [relatorioPesoSelecionado, setRelatorioPesoSelecionado] = useState(null);

    const [tipoSelecao, setTipoSelecao] = useState('ano');

    const dadosMock = {
        dataInicio: '01/10/2023',
        dataFim: '07/10/2023',
        totalCalorias: 14500,
        medicoes: [
        { calorias: 500, data: '01/10' },
        { calorias: 620, data: '01/10' },
        { calorias: 450, data: '02/10' },
        { calorias: 700, data: '03/10' },
        { calorias: 300, data: '04/10' },
        { calorias: 550, data: '05/10' }
        ]
    };
    const dadosMock2 = {
        dataInicio: '01/10/2023',
        dataFim: '07/10/2023',
        medicoes: [
        { peso: 45, data: '01/10' },
        { peso: 50, data: '01/10' },
        { peso: 40, data: '02/10' },
        { peso: 42, data: '03/10' },
        { peso: 51, data: '04/10' },
        { peso: 47, data: '05/10' }
        ]
    };


  useEffect(() => {
    const buscarDados = async () => {
        try {
            const response = await fetch('http://localhost:3001/relatorios');
            const data = await response.json();
            setRelatorioGlicemia(data.glicemia);
            setRelatorioPeso(data.peso);
            setGlicemia(data.glicemia);
            setPeso(data.peso);
            console.log(data);
        } catch (error) {
            console.error('Erro ao buscar dados:', error);
        }
    };

    buscarDados();
  },[]);


  function selecionarTipo(tipo) {
    setTipoSelecao(tipo);
  };

  const abrirModalRefeicao = () => {
    setRelatorioRefeicaoSelecionado(dadosMock); // Aqui você passaria o item clicado real
    setModalRefeicao(true);
  };

  const abrirModalPeso = () => {
    setRelatorioPesoSelecionado(dadosMock2); // Aqui você passaria o item clicado real
    setModalPeso(true);
  };

  return (
    
    <div>
        <RelatorioRefeicaoPopup isOpen={modalRefeicao} onClose={() => setModalRefeicao(false)} relatorio={relatorioRefeicaoSelecionado} />
        <RelatorioPesoPopup isOpen={modalPeso} onClose={() => setModalPeso(false)} relatorio={relatorioPesoSelecionado} />

        <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center'}}>
            <h2 className="page-title">Relatório Geral</h2>
            <button className="btn btn-primary">Emitir Relatório</button>
            <button className='btn btn-secundary' onClick={abrirModalRefeicao}>abrir modal</button>
            <button className='btn btn-secundary' onClick={abrirModalPeso}>abrir modal2</button>
        </div>

        <div className="card">
            <h3>Relatórios de refeição</h3>
            {relatorioGlicemia.length > 0 ? 
            <div className="number-badges">
            {relatorioGlicemia.map((relatorio, i) => <div key={i} className="badge">{relatorio.nome} - {i + 1}°</div>)}
            </div>
            :
            <p>Sem relatorios</p>}
            
        </div>

        <div className="card">
            <h3>Relatórios de medições</h3>
            {relatorioPeso.length > 0 ?
            <div className="number-badges">
            {relatorioPeso.map((relatorio, i) => <div key={i} className="badge">{relatorio.nome} - {i + 1}°</div>)}
            </div>
            :
            <p>Sem relatorios</p>}
        </div>

      
        
        <div className="card" style={{height: 'auto'}}>
            <div style={{height: '50px', width: '350px',display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '5px'}}>
                <button className={tipoSelecao === 'ano' ? 'btn btn-primary' : 'btn btn-secondary'} onClick={() => selecionarTipo('ano')}>Esté ano</button>
                <button className={tipoSelecao === 'meses' ? 'btn btn-primary' : 'btn btn-secondary'} onClick={() => selecionarTipo('meses')}>Últimos meses</button>
                <button className={tipoSelecao === 'mes' ? 'btn btn-primary' : 'btn btn-secondary'} onClick={() => selecionarTipo('mes')}>Esté meses</button>
            </div>
            
            
            <div style={{display: 'flex', flexWrap: 'wrap'}}>
                <div style={{height: '250px', width: 'auto', minWidth: '48%', maxWidth: '100%',margin: '10px'}}>
                    <h4>Glicemia</h4>
                    {glicemia.length != 0 ? 
                    <ResponsiveContainer width="100%" height="100%" style={{visibility: 'visible'}}>
                        <LineChart data={glicemia} >
                            <XAxis dataKey="name" />
                            <YAxis />
                            <Tooltip />
                            <Line type="monotone" dataKey="valor" stroke="#4a6fa5" strokeWidth={3} dot={{r:6}} />
                        </LineChart>
                    </ResponsiveContainer> 
                    :
                    <p>Sem medições suficientes</p>
                    }
                    
                </div>
                <div style={{height: '250px', width: 'auto', minWidth: '48%', maxWidth: '100%',margin: '10px'}}>
                    <h4>Peso</h4>
                    {peso.length != 0 ? 
                    <ResponsiveContainer width="100%" height="100%">
                        <LineChart data={peso}>
                            <XAxis dataKey="name" />
                            <YAxis />
                            <Tooltip />
                            <Line type="monotone" dataKey="valor" stroke="#814aa5" strokeWidth={3} dot={{r:6}} />
                        </LineChart>
                    </ResponsiveContainer>
                    : 
                    <p>Sem medições suficientes</p>}
                    
                </div>
            </div>
        </div>
        <div className="card" style={{height: '300px'}}>
            
        </div>
    
    </div>
  );
}