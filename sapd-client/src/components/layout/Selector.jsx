import { useState } from 'react';
import { Search, Plus, Minus } from 'lucide-react';

export default function Selector({ onSelectionChange, alimentos}) {
  
  const [busca, setBusca] = useState('');
  // O estado 'selecionados' guarda: { id_do_alimento: quantidade }
  // Exemplo: { 1: 2, 3: 1 } -> 2 porções de Arroz e 1 de Frango
  const [selecionados, setSelecionados] = useState({});

  // Filtra a lista visualmente
  const itensFiltrados = alimentos.filter(item => 
    item.nome.toLowerCase().includes(busca.toLowerCase())
  );

  const atualizarQtd = (id, delta) => {
    setSelecionados(prev => {
      const novaQtd = (prev[id] || 0) + delta;
      
      const novoEstado = { ...prev };
      
      if (novaQtd <= 0) {
        delete novoEstado[id]; // Remove do objeto se for 0
      } else {
        novoEstado[id] = novaQtd; // Atualiza se for > 0
      }

      // Envia para o componente pai (se a função existir)
      if (onSelectionChange) {
        onSelectionChange(novoEstado);
      }

      return novoEstado;
    });
  };

  return (
    <div className="food-selector-container">
      {/* Barra de Busca */}
      <div className="search-box">
        <Search size={18} color="#888" />
        <input 
          type="text" 
          placeholder="Buscar alimento..." 
          className="search-input"
          value={busca}
          onChange={(e) => setBusca(e.target.value)}
        />
      </div>

      {/* Lista com Scroll */}
      <div className="food-list">
        {itensFiltrados.map(item => {
          const qtd = selecionados[item.id] || 0;
          const isSelected = qtd > 0;

          return (
            <div key={item.id} className={`food-item ${isSelected ? 'active' : ''}`}>
              
              <div className="food-info">
                <strong>{item.nome}</strong> - {item.tipo}
                <small>{item.medida} • {item.kcal} kcal • {item.carboidratos} c • {item.proteinas} p • {item.gorduras} g</small>
              </div>

              <div className="counter-control">
                <button 
                  className="btn-mini btn-minus" 
                  onClick={() => atualizarQtd(item.id, -1)}
                  disabled={qtd === 0}
                >
                  <Minus size={14} />
                </button>
                
                <span className="count-display">{qtd}</span>
                
                <button 
                  className="btn-mini btn-plus" 
                  onClick={() => atualizarQtd(item.id, 1)}
                >
                  <Plus size={14} />
                </button>
              </div>

            </div>
          );
        })}
        
        {itensFiltrados.length === 0 && (
          <p style={{textAlign: 'center', padding: '20px', color: '#999'}}>
            Nenhum alimento encontrado.
          </p>
        )}
      </div>
    </div>
  );
}