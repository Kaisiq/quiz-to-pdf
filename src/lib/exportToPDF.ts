import html2canvas from "html2canvas";
import { jsPDF } from "jspdf";

const exportToPDF = async (container: HTMLDivElement) => {
  await html2canvas(container).then((canvas) => {
    const imgData = canvas.toDataURL("image/png");
    const pdf = new jsPDF("p", "mm", "a4");

    const imgProps = pdf.getImageProperties(imgData);
    const pdfWidth = pdf.internal.pageSize.getWidth();
    const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width;

    pdf.addImage(imgData, "PNG", 0, 0, pdfWidth, pdfHeight);
    pdf.save("test-paper.pdf");
  });
};

export { exportToPDF };
