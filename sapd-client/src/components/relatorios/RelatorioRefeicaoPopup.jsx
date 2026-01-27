import { X, Calendar, Flame } from 'lucide-react';

export default function RelatorioRefeicaoPopup({ isOpen, onClose, relatorio }) {
  // Se não estiver aberto ou não tiver dados, não renderiza nada (null)
  if (!isOpen || !relatorio) return null;

  return (
    <div className="modal-overlay" onClick={onClose}>
      {/* e.stopPropagation() impede que o clique DENTRO do modal feche ele */}
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        
        {/* Cabeçalho do Modal */}
        <div className="modal-header">
          <h3>Detalhes do Relatório</h3>
          <button className="btn-icon" onClick={onClose}>
            <X size={24} color="#555" />
          </button>
        </div>

        {/* Corpo com Informações */}
        <div className="modal-body">
          
          {/* Datas */}
          <div className="info-row">
            <div className="info-item">
              <Calendar size={18} className="text-primary" />
              <span>Início: <strong>{relatorio.dataInicio}</strong></span>
            </div>
            <div className="info-item">
              <Calendar size={18} className="text-primary" />
              <span>Fim: <strong>{relatorio.dataFim}</strong></span>
            </div>
          </div>

          <hr className="divider" />

          {/* Grid de Medições */}
          <h4 style={{marginBottom: '10px', color: '#666'}}>Medições no Período</h4>
          <div className="medicoes-grid">
            {relatorio.medicoes.map((item, index) => (
              <div key={index} className="medicao-card">
                <span className="medicao-valor">{item.calorias} kcal</span>
                <span className="medicao-data">{item.data}</span>
              </div>
            ))}
          </div>

          <hr className="divider" />

          {/* Totalizador */}
          <div className="total-box">
             <div style={{display: 'flex', alignItems: 'center', gap: '10px'}}>
                <div className="icon-circle">
                    <Flame size={24} color="white" />
                </div>
                <div>
                    <span style={{fontSize: '0.9rem', color: '#666'}}>Total Consumido</span>
                    <div style={{fontSize: '1.5rem', fontWeight: 'bold', color: '#333'}}>
                        {relatorio.totalCalorias} kcal
                    </div>
                </div>
             </div>
          </div>

        </div>
      </div>
    </div>
  );
}