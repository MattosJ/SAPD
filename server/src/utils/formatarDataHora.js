export function formatarDataHora(dataHoraISO) {
  const data = new Date(dataHoraISO);

  return {
    data: data.toLocaleDateString('pt-BR'),
    hora: data.toLocaleTimeString('pt-BR', {
      hour: '2-digit',
      minute: '2-digit'
    })
  };
  
}

export function formatarData(data){
   return new Date(data).toLocaleDateString('pt-BR');
}