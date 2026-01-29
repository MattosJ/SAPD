import { useState, useEffect } from 'react';
import { Plus, Trash2, Eye, Calendar } from 'lucide-react';
import CriarPlanoPopup from '../components/plano/CriarPlanoPopup';
import DetalhesPlanoPopup from '../components/plano/DetalhesPlanoPopup';

export default function PlanosAlimentares() {
    const [modalCriarAberto, setModalCriarAberto] = useState(false);
    const [modalDetalhesAberto, setModalDetalhesAberto] = useState(false);
    const [planoSelecionado, setPlanoSelecionado] = useState(null);
    const [alimentos, setAlimentos] = useState([]);


  // Mock de Planos para listagem
    const [planos, setPlanos] = useState([
        {
        id: 1,
        descricao: "Dieta de Verão",
        data_inicio: "2026-01-01",
        data_fim: "2026-03-01",
        refeicoes: [
            {
            tipo: "Café da Manhã",
            horario: "07:30",
            alimentos: [{ alimento_id: 5, quantidade: 1 }]
            }
        ]
        },
        {
        id: 2,
        descricao: "Dieta Hipertrofia",
        data_inicio: "2026-04-01",
        data_fim: "2026-06-01",
        refeicoes: []
        }
    ]);

    const handleSalvarPlano = async (novoPlano) => {
        try {
            const response = await fetch('http://localhost:3000/planos-alimentares', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(novoPlano),
            });

            if (!response.ok) {
                throw new Error('Erro ao salvar plano');
            }
            
            // Simulando adição na lista local
            const planoComId = { ...novoPlano, id: Date.now() };
            setPlanos([...planos, planoComId]);
        } catch (error) {
            console.error('Erro ao salvar plano alimentar:', error);
        }
    };

    const handleExcluir = async (id) => {
        if (confirm('Tem certeza que deseja excluir este plano?')) {
            try {
                const response = await fetch(`http://localhost:3000/planos-alimentares/${id}`, {
                    method: 'DELETE',
                });
                if (!response.ok) {
                    throw new Error('Erro ao excluir plano');
                }

                setPlanos(planos.filter(p => p.id !== id));
            } catch (error) {
                console.error('Erro ao excluir plano alimentar:', error);
            }
        }
    };

    const abrirDetalhes = (plano) => {
        setPlanoSelecionado(plano);
        setModalDetalhesAberto(true);
    };

    useEffect(() => {
        const buscarAlimentos = async () => {
            try {
                const response = fetch('http://localhost:3000/alimentos');
                const data = await response.json();
                setAlimentos(data);
                console.log(data);
            } catch (error) {
                console.error('Erro ao buscar dados:', error);
            }
        }
        const buscarPlanos = async () => {
            try {
                const response = fetch('http://localhost:3000/planos-alimentares');
                const data = await response.json();
                setPlanos(data);
                console.log(data);
            } catch (error) {
                console.error('Erro ao buscar dados:', error);
            }
        };

        buscarPlanos();

        buscarAlimentos();
    },[]);

    return (
        <div>
        <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px'}}>
            <h2 className="page-title">Meus Planos Alimentares</h2>
            <button className="btn btn-primary" onClick={() => setModalCriarAberto(true)}>
            <Plus size={18} style={{marginRight: '5px'}}/> Novo Plano
            </button>
        </div>

        {/* Grid de Listagem */}
        <div className="grid-2">
            {planos.map(plano => (
            <div key={plano.id} className="card" style={{position: 'relative', transition: '0.3s'}}>
                <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start'}}>
                <div>
                    <h3 style={{color: '#4a6fa5', marginBottom: '5px'}}>{plano.descricao}</h3>
                    <div style={{display: 'flex', gap: '5px', color: '#666', fontSize: '0.9rem', alignItems: 'center'}}>
                    <Calendar size={14}/> 
                    {plano.data_inicio} até {plano.data_fim}
                    </div>
                    <div style={{marginTop: '10px', fontSize: '0.85rem', color: '#888'}}>
                    {plano.refeicoes.length} refeições cadastradas
                    </div>
                </div>

                <div style={{display: 'flex', gap: '5px'}}>
                    <button className="btn" style={{padding: '8px', color: '#4a6fa5'}} onClick={() => abrirDetalhes(plano)}>
                    <Eye size={20} />
                    </button>
                    <button className="btn" style={{padding: '8px', color: '#e74c3c'}} onClick={() => handleExcluir(plano.id)}>
                    <Trash2 size={20} />
                    </button>
                </div>
                </div>
            </div>
            ))}

            {planos.length === 0 && <p style={{color: '#888'}}>Nenhum plano cadastrado.</p>}
        </div>

        {/* Modals */}
        <CriarPlanoPopup 
            isOpen={modalCriarAberto}
            onClose={() => setModalCriarAberto(false)}
            onSave={handleSalvarPlano}
            alimentos={alimentos}
        />

        <DetalhesPlanoPopup 
            isOpen={modalDetalhesAberto}
            onClose={() => setModalDetalhesAberto(false)}
            plano={planoSelecionado}
        />

        </div>
    );
}