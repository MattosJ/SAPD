import { X, Check, Flame, Droplet, Wheat, Dumbbell } from 'lucide-react';

export default function ConfirmacaoRefeicaoPopup({ isOpen, onClose, onConfirm, itens }) {
  if (!isOpen || !itens || itens.length === 0) return null;

  // 1. Lógica de Totalização
  const totais = itens.reduce((acc, item) => {
    // Multiplica o valor nutricional pela quantidade de itens/porções selecionadas
    const qtd = item.quantidade;
    
    return {
      kcal: acc.kcal + (item.kcal * qtd),
      carb: acc.carb + (item.carboidratos * qtd),
      prot: acc.prot + (item.proteinas * qtd),
      gord: acc.gord + (item.gorduras * qtd),
      // Coleta as strings de vitaminas para tratar depois
      vitaminasRaw: item.vitaminas ? [...acc.vitaminasRaw, item.vitaminas] : acc.vitaminasRaw
    };
  }, { kcal: 0, carb: 0, prot: 0, gord: 0, vitaminasRaw: [] });

  // 2. Lógica para unir e remover vitaminas duplicadas
  // Ex: ["A, B1", "C, A"] vira ["A", "B1", "C"]
  const listaVitaminas = [...new Set(
    totais.vitaminasRaw
      .join(',') // Junta tudo numa string só: "A, B1,C, A"
      .split(',') // Separa por virgula: ["A", " B1", "C", " A"]
      .map(v => v.trim()) // Remove espaços: ["A", "B1", "C", "A"]
      .filter(v => v !== "") // Remove vazios
  )].sort().join(', ');

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={e => e.stopPropagation()}>
        
        {/* Header */}
        <div className="modal-header">
          <h3>Confirmar Refeição</h3>
          <button className="btn-icon" onClick={onClose}>
            <X size={24} color="#555" />
          </button>
        </div>

        <div className="modal-body">
          
          {/* Lista de Itens Selecionados */}
          <h4 className="section-title">Itens Selecionados ({itens.length})</h4>
          <div className="items-review-list">
            {itens.map((item, index) => (
              <div key={index} className="review-item">
                <div className="review-info">
                  <strong>{item.nome}</strong>
                  <div className="review-details">
                    <span>{item.quantidade}x</span>
                    <span className="separator">•</span>
                    <span>{(item.kcal * item.quantidade).toFixed(0)} kcal</span>
                  </div>
                </div>
                <div className="review-macros">
                   <small>C: {(item.carboidratos * item.quantidade).toFixed(1)}g</small>
                   <small>P: {(item.proteinas * item.quantidade).toFixed(1)}g</small>
                   <small>G: {(item.gorduras * item.quantidade).toFixed(1)}g</small>
                </div>
              </div>
            ))}
          </div>

          <hr className="divider" />

          {/* Área de Totalização Visual */}
          <div className="totals-container">
            
            {/* Kcal Principal */}
            <div className="total-main">
               <div className="icon-circle large">
                  <Flame size={28} color="white" />
               </div>
               <div>
                  <span className="label">Total Calórico</span>
                  <div className="value">{totais.kcal.toFixed(0)} kcal</div>
               </div>
            </div>

            {/* Grid de Macros */}
            <div className="macros-grid">
               <div className="macro-card carb">
                  <Wheat size={16} />
                  <span>Carb</span>
                  <strong>{totais.carb.toFixed(1)}g</strong>
               </div>
               <div className="macro-card prot">
                  <Dumbbell size={16} />
                  <span>Prot</span>
                  <strong>{totais.prot.toFixed(1)}g</strong>
               </div>
               <div className="macro-card fat">
                  <Droplet size={16} />
                  <span>Gord</span>
                  <strong>{totais.gord.toFixed(1)}g</strong>
               </div>
            </div>

            {/* Vitaminas */}
            {listaVitaminas && (
              <div className="vitamin-box">
                <strong>Vitaminas presentes:</strong>
                <p>{listaVitaminas}</p>
              </div>
            )}

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