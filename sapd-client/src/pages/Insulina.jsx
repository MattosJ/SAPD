import { useState } from 'react';
import { Trash2, Edit, Bell } from 'lucide-react';

export default function Insulina() {
  const [registros, setRegistros] = useState([
    { id: 1, tipo: 'Lenta', qtd: '10ui', hora: '08:00', data: '2023-10-25' },
    { id: 2, tipo: 'Rápida', qtd: '5ui', hora: '12:30', data: '2023-10-25' },
  ]);
  
  const [lembretes, setLembretes] = useState([
    { id: 1, msg: 'Aplicar Basal', hora: '22:00' }
  ]);

  const handleDelete = (id) => {
    setRegistros(registros.filter(r => r.id !== id));
  };

  return (
    <div className="grid-2">
      {/* Coluna da Esquerda: Registros */}
      <div>
        <h2 className="page-title">Aplicação de Insulina</h2>
        
        {/* Formulário de Registro */}
        <div className="card">
          <h3>Nova Aplicação</h3>
          <div className="grid-2" style={{marginTop: '10px'}}>
            <input className="input-field" placeholder="Tipo (ex: Basal)" />
            <input className="input-field" placeholder="Quantidade (ui)" type="number" />
          </div>
          <button className="btn btn-primary" style={{marginTop: '10px', width: '100%'}}>Registrar</button>
        </div>

        {/* Histórico */}
        <div className="card">
          <h3>Histórico de Aplicações</h3>
          <ul className="history-list">
            {registros.map(reg => (
              <li key={reg.id} className="history-item">
                <div>
                  <strong>{reg.tipo}</strong> - {reg.qtd}
                  <div style={{fontSize: '0.8rem', color: '#777'}}>{reg.data} às {reg.hora}</div>
                </div>
                <div>
                  <button className="btn" style={{padding: '5px'}}><Edit size={16} /></button>
                  <button className="btn" style={{padding: '5px', color: 'red'}} onClick={() => handleDelete(reg.id)}><Trash2 size={16} /></button>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Coluna da Direita: Lembretes */}
      <div>
        <h2 className="page-title">Lembretes</h2>
        <div className="card" style={{borderLeft: '5px solid #f39c12'}}>
          <h3>Criar Lembrete <Bell size={16}/></h3>
          <div style={{display: 'flex', gap: '10px', marginTop: '10px'}}>
            <input className="input-field" type="time" />
            <input className="input-field" placeholder="Descrição" />
          </div>
          <button className="btn btn-primary" style={{marginTop: '10px'}}>Salvar Lembrete</button>
        </div>

        <div className="card">
          <h3>Meus Lembretes</h3>
          <ul className="history-list">
            {lembretes.map(lem => (
              <li key={lem.id} className="history-item">
                <span>⏰ {lem.hora} - {lem.msg}</span>
                <Trash2 size={16} style={{cursor: 'pointer', color: '#888'}} />
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}