import { useState } from 'react';
import { X, Plus, Trash2 } from 'lucide-react';
import Selector from '../layout/Selector';

export default function CriarPlanoPopup({ isOpen, onClose, onSave, alimentos }) {
  if (!isOpen) return null;

  // Estado do Formulário Principal
  const [dadosPlano, setDadosPlano] = useState({
    descricao: '',
    data_inicio: '',
    data_fim: '',
    refeicoes: [] // Começa vazio
  });

  // Adiciona um bloco de refeição vazio
  const addRefeicao = () => {
    setDadosPlano(prev => ({
      ...prev,
      refeicoes: [
        ...prev.refeicoes,
        { id_temp: Date.now(), tipo: '', horario: '', alimentosSelecionados: {} }
      ]
    }));
  };

  // Remove uma refeição da lista visual
  const removeRefeicao = (id_temp) => {
    setDadosPlano(prev => ({
      ...prev,
      refeicoes: prev.refeicoes.filter(r => r.id_temp !== id_temp)
    }));
  };

  // Atualiza campos de texto da refeição (Tipo/Horário)
  const updateRefeicao = (id_temp, campo, valor) => {
    setDadosPlano(prev => ({
      ...prev,
      refeicoes: prev.refeicoes.map(r => 
        r.id_temp === id_temp ? { ...r, [campo]: valor } : r
      )
    }));
  };

  // Atualiza os alimentos selecionados de UMA refeição específica
  const handleAlimentosChange = (id_temp, novosAlimentos) => {
    setDadosPlano(prev => ({
      ...prev,
      refeicoes: prev.refeicoes.map(r => 
        r.id_temp === id_temp ? { ...r, alimentosSelecionados: novosAlimentos } : r
      )
    }));
  };

  // Formata os dados para o padrão da API e Salva
  const handleSalvar = () => {
    const payload = {
      descricao: dadosPlano.descricao,
      data_inicio: dadosPlano.data_inicio,
      data_fim: dadosPlano.data_fim,
      refeicoes: dadosPlano.refeicoes.map(r => ({
        tipo: r.tipo,
        horario: r.horario,
        // CONVERSÃO IMPORTANTE: De Objeto {id: qtd} para Array [{alimento_id: id, quantidade: qtd}]
        alimentos: Object.entries(r.alimentosSelecionados).map(([id, qtd]) => ({
          alimento_id: parseInt(id),
          quantidade: qtd // Assumindo que o FoodSelector retorna a quantidade/porção
        }))
      }))
    };

    onSave(payload);
    onClose();
    
  };

  return (
    <div className="modal-overlay">
      <div className="modal-content" style={{maxWidth: '800px', maxHeight: '90vh'}}>
        
        <div className="modal-header">
          <h3>Novo Plano Alimentar</h3>
          <button className="btn-icon" onClick={onClose}><X size={24} /></button>
        </div>

        <div className="modal-body">
          {/* Dados Gerais do Plano */}
          <div className="form-group">
            <label>Descrição do Plano</label>
            <input 
              className="input-field" 
              placeholder="Ex: Dieta de Verão"
              value={dadosPlano.descricao}
              onChange={e => setDadosPlano({...dadosPlano, descricao: e.target.value})}
            />
          </div>
          
          <div className="grid-2">
            <div className="form-group">
              <label>Data Início</label>
              <input type="date" className="input-field" 
                value={dadosPlano.data_inicio}
                onChange={e => setDadosPlano({...dadosPlano, data_inicio: e.target.value})}
              />
            </div>
            <div className="form-group">
              <label>Data Fim</label>
              <input type="date" className="input-field" 
                value={dadosPlano.data_fim}
                onChange={e => setDadosPlano({...dadosPlano, data_fim: e.target.value})}
              />
            </div>
          </div>

          <hr className="divider" />
          
          {/* Área de Refeições */}
          <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '15px'}}>
            <h4>Refeições do Plano</h4>
            <button className="btn btn-secondary" onClick={addRefeicao} style={{fontSize: '0.8rem'}}>
              <Plus size={16} /> Adicionar Refeição
            </button>
          </div>

          <div style={{display: 'flex', flexDirection: 'column', gap: '20px'}}>
            {dadosPlano.refeicoes.map((ref, index) => (
              <div key={ref.id_temp} className="card" style={{border: '1px solid #ddd', padding: '15px', backgroundColor: '#fafafa'}}>
                
                <div style={{display: 'flex', justifyContent: 'space-between', marginBottom: '10px'}}>
                  <span style={{fontWeight: 'bold', color: '#4a6fa5'}}>Refeição #{index + 1}</span>
                  <button className="btn-icon" onClick={() => removeRefeicao(ref.id_temp)}>
                    <Trash2 size={18} color="red" />
                  </button>
                </div>

                <div className="grid-2">
                  <input 
                    className="input-field" 
                    placeholder="Tipo (Ex: Café da Manhã)" 
                    value={ref.tipo}
                    onChange={e => updateRefeicao(ref.id_temp, 'tipo', e.target.value)}
                  />
                  <input 
                    type="time" 
                    className="input-field"
                    value={ref.horario}
                    onChange={e => updateRefeicao(ref.id_temp, 'horario', e.target.value)}
                  />
                </div>

                <div style={{marginTop: '10px'}}>
                  <label style={{fontSize: '0.9rem', color: '#666'}}>Selecione os alimentos:</label>
                  {
                  isOpen &&
                  <Selector
                    alimentos={alimentos}
                    onSelectionChange={(novosAlimentos) => handleAlimentosChange(ref.id_temp, novosAlimentos)} 
                  />
                  }
                </div>
              </div>
            ))}
          </div>

        </div>

        <div className="modal-header" style={{borderTop: '1px solid #eee', marginTop: '10px', justifyContent: 'flex-end'}}>
          <button className="btn btn-primary" onClick={handleSalvar}>Salvar Plano</button>
        </div>

      </div>
    </div>
  );
}