import { X, Calendar, Clock } from 'lucide-react';

export default function DetalhesPlanoPopup({ isOpen, onClose, plano }) {
  if (!isOpen || !plano) return null;

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={e => e.stopPropagation()} style={{maxWidth: '600px'}}>
        
        <div className="modal-header">
          <h3>{plano.descricao}</h3>
          <button className="btn-icon" onClick={onClose}><X size={24} /></button>
        </div>

        <div className="modal-body">
          <div className="info-row">
            <div className="info-item">
              <Calendar size={18} className="text-primary" />
              <span>{plano.data_inicio} até {plano.data_fim}</span>
            </div>
          </div>

          <hr className="divider" />

          <h4>Refeições Planejadas</h4>
          <div style={{display: 'flex', flexDirection: 'column', gap: '15px', marginTop: '10px'}}>
            {plano.refeicoes.map((ref, idx) => (
              <div key={idx} style={{backgroundColor: '#f8f9fa', padding: '10px', borderRadius: '8px', borderLeft: '4px solid #4a6fa5'}}>
                <div style={{display: 'flex', justifyContent: 'space-between', marginBottom: '5px'}}>
                  <strong>{ref.tipo}</strong>
                  <div className="info-item"><Clock size={14}/> {ref.horario}</div>
                </div>
                
                <ul style={{paddingLeft: '20px', fontSize: '0.9rem', color: '#555'}}>
                  {ref.alimentos.map((alimento, i) => (
                    <li key={i}>
                       {/* Como o mock pode vir só com ID, simulei um nome genérico, mas no real viria do backend */}
                       Alimento ID: {alimento.alimento_id} — Qtd: {alimento.quantidade}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
}