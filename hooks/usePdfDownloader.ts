import { useCallback } from 'react';
// Note: This hook relies on the 'jspdf' and 'jspdf-autotable' libraries.
// Ensure they are available in your project's environment.
import { jsPDF } from 'jspdf';
import autoTable from 'jspdf-autotable';

export const usePdfDownloader = () => {
  const downloadPdf = useCallback((text: string, filename: string) => {
    try {
      const doc = new jsPDF();
      
      const pageWidth = doc.internal.pageSize.getWidth();
      const margin = 15;
      const maxLineWidth = pageWidth - margin * 2;

      // Add a title
      doc.setFontSize(18);
      doc.text("Audio Transcription", margin, 22);

      // Add the body text
      doc.setFontSize(11);
      const splitText = doc.splitTextToSize(text, maxLineWidth);
      
      // Use autoTable for robust text handling and page breaks
      autoTable(doc, {
        startY: 30,
        body: [[splitText]],
        theme: 'plain',
        styles: {
          font: 'helvetica',
          fontSize: 11,
          cellPadding: 0,
        },
      });
      
      doc.save(filename);
    } catch (e) {
      console.error("Failed to generate PDF", e);
      alert("There was an error creating the PDF file.");
    }
  }, []);

  return downloadPdf;
};
