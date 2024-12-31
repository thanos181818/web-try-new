import jsPDF from 'jspdf';
import "jspdf-autotable";

export const downloadReport = (anomalies) => {
  const doc = new jsPDF();
  
  // Add title
  doc.setFontSize(18);
  doc.text('Video Analysis Report', 105, 15, null, null, 'center');
  
  // Add anomalies table
  doc.setFontSize(14);
  doc.text('Anomalies', 14, 25);
  
  const tableColumns = ['ID', 'Name', 'Description', 'Result', 'Score'];
  const tableRows = anomalies.map(anomaly => [
    anomaly.anomaly_id,
    anomaly.name,
    anomaly.description,
    anomaly.Result,
    anomaly.Video_Median_Anomaly_Score[0]?.toFixed(3) || 'N/A'
  ]);
  
  doc.autoTable({
    startY: 30,
    head: [tableColumns],
    body: tableRows,
  });
  
  // Save the PDF
  doc.save('video_analysis_report.pdf');
};

export const printReport = () => {
  window.print();
};

