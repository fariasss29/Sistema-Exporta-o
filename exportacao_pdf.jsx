
import { PDFDocument, StandardFonts } from 'pdf-lib';
import templateUrl from '@/assets/exportacao/template-exportacao.pdf?url';  


export async function buildExportacaoPdf(dados) {
  const tplBytes = await fetch(templateUrl).then(r => r.arrayBuffer());   
  const pdf      = await PDFDocument.load(tplBytes);

  const helv  = await pdf.embedFont(StandardFonts.Helvetica);
  const page  = pdf.getPages()[0];
  const { height } = page.getSize();

  page.drawText(dados.part_number,       { x: 80, y: height-245, size:6, font:helv });
  page.drawText(String(dados.qtd_pecas), { x: 250, y: height-150, size:12, font:helv });
  page.drawText(
    Number(dados.valor_total).toFixed(2).replace('.', ','),
    { x: 400, y: height-150, size:12, font:helv }
  );
  page.drawText(String(dados.nome), { x: 127, y: height-133.5, size:6, font:helv });
  

  const bytes = await pdf.save();
  return new Blob([bytes], { type: 'application/pdf' });
}


import { useLocation } from 'react-router-dom';
import { useEffect, useRef } from 'react';

export default function Exportacao_pdf() {
  const { state: dados } = useLocation();
  const iframeRef = useRef(null);

  useEffect(() => {
    if (!dados) return;
    buildExportacaoPdf(dados).then(blob => {
      iframeRef.current.src = URL.createObjectURL(blob);
    });
  }, [dados]);

  return <iframe ref={iframeRef} style={{ width:'100%', height:'100vh', border:0 }} />;
}
