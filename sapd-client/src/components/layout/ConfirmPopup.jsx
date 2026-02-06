import { X, Check, Flame, Droplet, Wheat, Dumbbell } from 'lucide-react';

export default function ConfirmPopup({ isOpen, onClose, onConfirm, msg, titulo}) {
  if (!isOpen || !msg ) return null;

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={e => e.stopPropagation()}>
        
        {/* Header */}
        <div className="modal-header">
          <h3>Confirmar operação</h3>
          <button className="btn-icon" onClick={onClose}>
            <X size={24} color="#555" />
          </button>
        </div>

        <div className="modal-body">
          
          {/* Lista de Itens Selecionados */}
          <h4 className="section-title">{titulo ? titulo : 'Alteração de Dados'} </h4>
          
          <div className="totals-container">
            
            <p>{msg}</p>

          </div>

          {/* Botões de Ação */}
          <div className="modal-actions">
            <button className="btn btn-secondary" onClick={onClose} style={{marginRight: '10px'}}>
              Voltar
            </button>
            <button className="btn btn-primary" onClick={onConfirm} style={{display: 'flex', alignItems: 'center', gap: '8px'}}>
              <Check size={18} /> Confirmar
            </button>
          </div>

        </div>
      </div>
    </div>
  );
}