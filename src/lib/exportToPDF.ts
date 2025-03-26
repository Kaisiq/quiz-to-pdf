import html2canvas from "html2canvas";
import { quizToHtml } from "~/lib/quizToHtml";
import { jsPDF } from "jspdf";
import type { Quiz } from "~/types/quiz";

const exportToPDF = async (quiz: Quiz) => {
  const outerContainer = document.createElement("div");
  outerContainer.className =
    "w-[var(--150-dpi-width)] h-[var(--150-dpi-height)] top-[100%]";
  outerContainer.style.position = "absolute";

  const container = document.createElement("div");
  container.innerHTML = quizToHtml(quiz);

  outerContainer.appendChild(container);

  try {
    document.body.appendChild(outerContainer);

    await html2canvas(container).then((canvas) => {
      const imgData = canvas.toDataURL("image/png");
      const pdf = new jsPDF("p", "mm", "a4");

      const imgProps = pdf.getImageProperties(imgData);
      const pdfWidth = pdf.internal.pageSize.getWidth();
      const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width;

      pdf.addImage(imgData, "PNG", 0, 0, pdfWidth, pdfHeight);
      pdf.save("test-paper.pdf");
    });
  } catch (error) {
    console.error("Error generating PDF:", error);
  } finally {
    // document.body.removeChild(outerContainer);
  }
};

export { exportToPDF };
