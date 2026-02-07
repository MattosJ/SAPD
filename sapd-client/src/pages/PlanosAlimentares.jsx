import { useState, useEffect } from 'react';
import { Plus, Trash2, Eye, Calendar } from 'lucide-react';
import api from "../services/api";
import CriarPlanoPopup from '../components/plano/CriarPlanoPopup';
import DetalhesPlanoPopup from '../components/plano/DetalhesPlanoPopup';
import ConfirmPopup from '../components/layout/ConfirmPopup';

export default function PlanosAlimentares() {
    const [modalCriarAberto, setModalCriarAberto] = useState(false);
    const [modalDetalhesAberto, setModalDetalhesAberto] = useState(false);
    const [planoSelecionado, setPlanoSelecionado] = useState(null);
    const [alimentos, setAlimentos] = useState([]);

    const [modalConfirmacao, setModalConfirmacao] = useState(false);
    const [itemSelecionado, setItemSelecionado] = useState(null);


    const [planos, setPlanos] = useState([]);

    const confirmacaoItem = (id) => {
        setItemSelecionado(id);
        setModalConfirmacao(true);
    }

    const handleSalvarPlano = async (novoPlano) => {
        try {
            console.log(novoPlano);
            await api.post('/planos-alimentares', novoPlano);
            
            // Simulando adição na lista local
            const planoComId = { ...novoPlano, id: Date.now() };
            setPlanos([...planos, planoComId]);
        } catch (error) {
            console.error('Erro ao salvar plano alimentar:', error.response);
        }
    };

    const handleExcluir = async (id) => {

        try {
            await api.delete(`/planos-alimentares/${id}`);
    
            setPlanos(planos.filter(p => p.id !== id));
        } catch (error) {
            console.error('Erro ao excluir plano alimentar:', error.response);
        }
        
    };

    const abrirDetalhes = (plano) => {
        setPlanoSelecionado(plano);
        setModalDetalhesAberto(true);
    };

    useEffect(() => {
        const buscarAlimentos = async () => {
            try {
                const response = await api.get('/alimentos');
                const data = response.data;
                setAlimentos(data);
                console.log(data);
            } catch (error) {
                console.error('Erro ao buscar dados:', error.response);
            }
        }
        const buscarPlanos = async () => {
            try {
                const response = await api.get('/planos-alimentares');
                const data = response.data;
                setPlanos(data);
                console.log('planos');
                console.log(data);
            } catch (error) {
                console.error('Erro ao buscar dados:', error.response);
            }
        };

        buscarPlanos();

        buscarAlimentos();
    },[]);

    return (
        <div>
            <ConfirmPopup
                isOpen={modalConfirmacao}
                onClose={() => setModalConfirmacao(false)}
                onConfirm={() => handleExcluir(itemSelecionado)}
                msg={'Tem certeza que deseja excluir esse plano?\nEssa ação não poderá ser desfeita.'}
                titulo={'Excluir Plano Alimentar'}
            />
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
                    <button className="btn" style={{padding: '8px', color: '#e74c3c'}} onClick={() => confirmacaoItem(plano.id)}>
                    <Trash2 size={20} />
                    </button>
                </div>
                </div>
            </div>
            ))}

            {planos.length === 0 && <p style={{color: '#888'}}>Nenhum plano cadastrado.</p>}
        </div>


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