import PDFDocument from 'pdfkit';

export default function gerarRelatorioPDF(dados, res) {
  const doc = new PDFDocument();

  res.setHeader('Content-Type', 'application/pdf');
  res.setHeader(
    'Content-Disposition',
    'attachment; filename=relatorio_glicemia.pdf'
  );

  doc.pipe(res);

  doc.fontSize(18).text('Relatório de Glicemia', { align: 'center' });
  doc.moveDown();

  doc.fontSize(12).text(`Período: ${dados.periodo.dataInicio} a ${dados.periodo.dataFim}`);
  doc.moveDown();

  doc.text(`Total de medições: ${dados.resumo.total_medicoes}`);
  doc.text(`Média: ${Number(dados.resumo.media).toFixed(2)}`);
  doc.text(`Menor valor: ${dados.resumo.minimo}`);
  doc.text(`Maior valor: ${dados.resumo.maximo}`);
  doc.moveDown();

  doc.text('Histórico:');
  doc.moveDown();

  dados.medicoes.forEach(m => {
    doc.text(
      `${new Date(m.data_hora).toLocaleString()} - ${m.valor} mg/dL`
    );
  });

  doc.end();
}
