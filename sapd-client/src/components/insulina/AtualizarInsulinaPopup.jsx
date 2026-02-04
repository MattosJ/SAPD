export default function AtualizarInsulinaPopup({ isOpen, onClose, insulinaData, atualizarInsulina }) {
  // Se não estiver aberto ou não tiver dados, não renderiza nada (null)
  if (!isOpen || !insulinaData) return null;

  async function salvarAlteracoes() {
    try {
      const response = await fetch(`http://localhost:3000/insulina/${insulinaData.id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            tipo: insulinaData.tipo,
            quantidade: insulinaData.quantidade,
            momento: insulinaData.momento,
            observacoes: insulinaData.observacao
        }),
      });

      if (!response.ok) {
        throw new Error('Erro ao salvar alterações');
      }
        atualizarInsulina(insulinaData);
        onClose();
    } catch (error) {
      console.error('Erro ao salvar alterações:', error);
    }
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      {/* e.stopPropagation() impede que o clique DENTRO do modal feche ele */}
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        {/* Cabeçalho do Modal */}
        <div className="modal-header">
          <h3>Atualizar aplicação</h3>
          <button className="btn-icon" onClick={onClose}>
            <X size={24} color="#555" />
          </button>
        </div>

        {/* Corpo com Informações */}
        <div className="modal-body">
            <div className="total-box">
                <label>Tipo</label>
                <input className="input-field" name="tipo" value={insulinaData.tipo} onChange={(e) => insulinaData.tipo = e.target.value} style={{textAlign: 'center'}} />

                <label>Quantidade</label>
                <input className="input-field" name="quantidade" value={insulinaData.quantidade} onChange={(e) => insulinaData.quantidade = e.target.value} style={{textAlign: 'center'}} type="number"/>

                <label>Momento</label>
                <input className="input-field" name="momento" value={insulinaData.momento} onChange={(e) => insulinaData.momento = e.target.value} style={{textAlign: 'center'}} />

                <label>Observação</label>
                <input className="input-field" name="observacao" value={insulinaData.observacao} onChange={(e) => insulinaData.observacao = e.target.value} style={{textAlign: 'center'}} />
            </div>
            <button className="btn btn-primary" style={{marginTop: '20px'}} onClick={salvarAlteracoes}>Salvar Alterações</button>
        </div>
      </div>
    </div>
  );
}