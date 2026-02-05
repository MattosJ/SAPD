import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';
import { useState, useEffect } from 'react';
import api from "../services/api";
import RelatorioRefeicaoPopup from '../components/relatorios/RelatorioRefeicaoPopup';
import RelatorioPesoPopup from '../components/relatorios/RelatorioPesoPopup';



export default function Relatorios() {
  
    const [glicemia, setGlicemia] = useState([
        {data: '05/02/2026', valor: 50},
        {data: '08/02/2026', valor: 78},
    ]);
    const [peso, setPeso] = useState([
        {data: '05/02/2026', valor: 70},
        {data: '08/02/2026', valor: 65},
    ]);
    const [relatorioRefeicao, setRelatorioRefeicao] = useState([
        {id: 1, nome: 'Refeição 1', dataInicio: '01/02/2026', dataFim: '02/02/2026',totalCalorias: 120, medicoes: [{calorias: 120, data: '01/02/2026'}]},
        {id: 2, nome: 'Refeição 2', dataInicio: '02/02/2026', dataFim: '03/02/2026',totalCalorias: 150, medicoes: [{calorias: 150, data: '02/02/2026'}]},
    ]);
    const [relatorioPeso, setRelatorioPeso] = useState([
        {id: 1, nome: 'Peso 1', dataInicio: '01/02/2026', dataFim: '02/02/2026', medicoes: [{peso: 70, data: '01/02/2026'}, {peso: 68, data: '02/02/2026'}]},
    ]);
    const [planoConsumo, setPlanoConsumo] = useState(
        {
            "kcal": {
                "planejado": "2000.00",
                "consumido": "1850.50",
                "diferenca": "-149.50",
                "status": "abaixo"
            },
            "carboidratos": {
                "planejado": "3500.00",
                "consumido": "800.50",
                "diferenca": "-149.50",
                "status": "abaixo"
            }
        }
    );
    
    const [modalRefeicao, setModalRefeicao] = useState(false);
    const [relatorioRefeicaoSelecionado, setRelatorioRefeicaoSelecionado] = useState(null);

    const [modalPeso, setModalPeso] = useState(false);
    const [relatorioPesoSelecionado, setRelatorioPesoSelecionado] = useState(null);

    const [tipoSelecao, setTipoSelecao] = useState('ano');

    async function buscarDadosPorTempo() {
        try {
            const response = await api.get(`/relatorios/${tipoSelecao}`);

            const data = response.data;
            setGlicemia(data.glicemia);
            setPeso(data.peso);
            console.log(data);
        } catch (error) {
            console.error('Erro ao buscar dados:', error.response);
        }
    }

  useEffect(() => {
    const buscarDados = async () => {
        try {
            const response = await api.get('/relatorios');

            const data = response.data;
            setRelatorioRefeicao(data.relatoriosRefeicao ? data.relatoriosRefeicao : []);
            setRelatorioPeso(data.relatoriosPeso ? data.relatoriosPeso : []);
            setGlicemia(data.glicemia ? data.glicemia : []);
            setPeso(data.peso ? data.peso : []);
            console.log(data);
        } catch (error) {
            console.error('Erro ao buscar dados:', error.response);
        }
    };
    const buscarPlanoConsumo = async () => {
        try {
            
            const response = await api.get('/comparacao/plano-consumo');
            
            const data = response.data;
            setPlanoConsumo(data);
            console.log(data);
        } catch (error) {
            console.error('Erro ao buscar dados:', error.response);
        }
    };


    buscarDados();
    buscarPlanoConsumo();
  },[]);

    function transformaEspectativaArray() {
    let dado = [];
        Object.entries(planoConsumo).forEach(element => {
            dado.push({
                name: element[0],
                planejado: element[1].planejado,
                consumido: element[1].consumido,
                diferenca: element[1].diferenca,
                status: element[1].status
            });
        });
        return dado;
    }

    function selecionarTipo(tipo) {
        setTipoSelecao(tipo);
    };

    const abrirModalRefeicao = (index) => {
        setRelatorioRefeicaoSelecionado(relatorioRefeicao[index]); 
        setModalRefeicao(true);
    };

    const abrirModalPeso = (index) => {
        setRelatorioPesoSelecionado(relatorioPeso[index]); // Aqui você passaria o item clicado real
        setModalPeso(true);
    };

    return (
        
        <div>
            <RelatorioRefeicaoPopup isOpen={modalRefeicao} onClose={() => setModalRefeicao(false)} relatorio={relatorioRefeicaoSelecionado} />
            <RelatorioPesoPopup isOpen={modalPeso} onClose={() => setModalPeso(false)} relatorio={relatorioPesoSelecionado} />

            <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center'}}>
                <h2 className="page-title">Relatório Geral</h2>
            </div>

            <div className="card">
                <h3>Relatórios de refeição</h3>
                {relatorioRefeicao.length > 0 ? 
                <div className="number-badges">
                    {
                        relatorioRefeicao.map(
                            (relatorio, i) => 
                            <div key={i} className="badge" onClick={() => abrirModalRefeicao(i)}>
                                {relatorio.nome} - {i + 1}°
                            </div>
                        )
                    }
                </div>
                :
                <p style={{color: '#999', fontStyle: 'italic'}}>Sem relatorios</p>}
                
            </div>

            <div className="card">
                <h3>Relatórios de medições</h3>
                {relatorioPeso.length > 0 ?
                <div className="number-badges">
                {relatorioPeso.map((relatorio, i) => <div key={i} className="badge" onClick={() => abrirModalPeso(i)}>{relatorio.nome} - {i + 1}°</div>)}
                </div>
                :
                <p style={{color: '#999', fontStyle: 'italic'}}>Sem relatorios</p>}
            </div>

        
            
            <div className="card" style={{height: 'auto'}}>
                <div style={{height: '50px', width: '350px',display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '5px'}}>
                    <button className={tipoSelecao === 'ano' ? 'btn btn-primary' : 'btn btn-secondary'} onClick={() => {selecionarTipo('ano'); buscarDadosPorTempo()}}>Esté ano</button>
                    <button className={tipoSelecao === 'meses' ? 'btn btn-primary' : 'btn btn-secondary'} onClick={() => {selecionarTipo('meses'); buscarDadosPorTempo()}}>Últimos meses</button>
                    <button className={tipoSelecao === 'mes' ? 'btn btn-primary' : 'btn btn-secondary'} onClick={() => {selecionarTipo('mes'); buscarDadosPorTempo()}}>Esté meses</button>
                </div>
                
                
                <div style={{display: 'flex', flexWrap: 'wrap'}}>
                    <div style={{height: '250px', width: 'auto', minWidth: '48%', maxWidth: '100%',margin: '10px'}}>
                        <h4>Glicemia</h4>
                        {glicemia.length != 0 ? 
                        <ResponsiveContainer width="100%" height="100%" style={{visibility: 'visible'}}>
                            <LineChart data={glicemia} >
                                <XAxis dataKey="data" />
                                <YAxis />
                                <Tooltip />
                                <Line type="monotone" dataKey="valor" stroke="#4a6fa5" strokeWidth={3} dot={{r:6}} />
                            </LineChart>
                        </ResponsiveContainer> 
                        :
                        <p style={{color: '#999', fontStyle: 'italic'}}>Sem medições suficientes</p>
                        }
                        
                    </div>
                    <div style={{height: '250px', width: 'auto', minWidth: '48%', maxWidth: '100%',margin: '10px'}}>
                        <h4>Peso</h4>
                        {peso.length != 0 ? 
                        <ResponsiveContainer width="100%" height="100%">
                            <LineChart data={peso}>
                                <XAxis dataKey="data" />
                                <YAxis />
                                <Tooltip />
                                <Line type="monotone" dataKey="valor" stroke="#814aa5" strokeWidth={3} dot={{r:6}} />
                            </LineChart>
                        </ResponsiveContainer>
                        : 
                        <p style={{color: '#999', fontStyle: 'italic'}}>Sem medições suficientes</p>}
                        
                    </div>
                </div>
            </div>
            <div className="card" style={{height: '300px', position: 'relative'}}>
                <h4>Plano X Consumo</h4>
                {planoConsumo.length != 0 ? 
                <div>
                    <div style={{height: '250px', width: 'auto', minWidth: '48%', maxWidth: '100%',margin: '10px', position: 'absolute'}}>
                        
                        
                        <ResponsiveContainer width="100%" height="100%">
                            <LineChart data={transformaEspectativaArray()}>
                                <XAxis dataKey="name" />
                                <YAxis />
                                <Tooltip />
                                <Line type="step" dataKey="planejado" stroke="#814aa5" strokeWidth={3} dot={false} />
                                <Line type="step" dataKey="consumido" stroke="#4a79a5" strokeWidth={3} dot={false} />
                            </LineChart>
                        </ResponsiveContainer>
                    </div>
                    
                </div>
                :
                <p style={{color: '#999', fontStyle: 'italic'}}>Sem dados de plano de consumo</p>
                }
            </div>
        
        </div>
    );
}