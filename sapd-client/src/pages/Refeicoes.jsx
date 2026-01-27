import { useState } from 'react';
import { Trash2, Plus } from 'lucide-react';

export default function Refeicoes() {
  const [refeicoes, setRefeicoes] = useState([
    { id: 1, desc: 'Café da manhã: Pão e Café', carbs: '30g', hora: '08:00' },
  ]);

  return (
    <div>
      <h2 className="page-title">Registro de Refeições</h2>
      
      <div className="card">
        <div style={{display: 'flex', gap: '10px'}}>
          <input className="input-field" placeholder="O que você comeu?" style={{flex: 2}} />
          <input className="input-field" placeholder="Carboidratos (g)" style={{flex: 1}} />
          <button className="btn btn-primary"><Plus size={20}/></button>
        </div>
      </div>

      <div className="grid-2">
        <div className="card">
          <h3>Hoje</h3>
          <ul className="history-list">
            {refeicoes.map(ref => (
              <li key={ref.id} className="history-item">
                <div>
                  <strong>{ref.desc}</strong>
                  <br/><small>{ref.hora} - {ref.carbs} Carbs</small>
                </div>
                <Trash2 size={18} color="red" style={{cursor: 'pointer'}} />
              </li>
            ))}
          </ul>
        </div>
        
        <div className="card">
          <h3>Lembretes de Alimentação</h3>
          <p style={{color: '#999', fontStyle: 'italic'}}>Nenhum lembrete ativo.</p>
          <button className="btn btn-primary" style={{marginTop: '10px'}}>+ Novo Lembrete</button>
        </div>
      </div>
    </div>
  );
}