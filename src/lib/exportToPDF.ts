import html2canvas from "html2canvas";
import { quizToHtml } from "~/lib/quizToHtml";
import { jsPDF } from "jspdf";
import type { Quiz } from "~/types/quiz";

const exportToPDF = async (quiz: Quiz) => {
  const a4Width = 1240;
  const a4Height = 1754;

  const outerContainer = document.createElement("div");
  outerContainer.className =
    "w-[var(--150-dpi-width)] h-[var(--150-dpi-height)] top-[100%]";
  outerContainer.style.position = "absolute";
  outerContainer.style.width = `${a4Width}px`;
  outerContainer.style.overflow = "hidden";
  outerContainer.style.top = "0";
  outerContainer.style.left = "0";

  const container = document.createElement("div");
  container.innerHTML = quizToHtml(quiz);
  outerContainer.appendChild(container);

  try {
    document.body.appendChild(outerContainer);

    const totalHeight = container.scrollHeight;
    const pageCount = Math.ceil(totalHeight / a4Height);

    const pdf = new jsPDF("p", "pt", "a4");

    for (let i = 0; i < pageCount; i++) {
      const pageContainer = document.createElement("div");
      pageContainer.style.width = `${a4Width}px`;
      pageContainer.style.height = `${a4Height}px`;
      pageContainer.style.overflow = "hidden";
      pageContainer.style.position = "absolute";
      pageContainer.style.top = "0";
      pageContainer.style.left = "0";

      const pageContent = container.cloneNode(true) as HTMLDivElement;
      pageContent.style.position = "absolute";
      pageContent.style.top = `-${i * a4Height}px`;

      pageContainer.appendChild(pageContent);
      document.body.appendChild(pageContainer);

      const canvas = await html2canvas(pageContainer);

      if (i > 0) {
        pdf.addPage();
      }
      pdf.addImage(canvas, "canvas", 0, 0, a4Width / 2, a4Height / 2);
      document.body.removeChild(pageContainer);
    }

    pdf.save("test-paper.pdf");
  } catch (error) {
    console.error("Error generating PDF:", error);
  } finally {
    document.body.removeChild(outerContainer); // Important: remove the container.
  }
};

export { exportToPDF };
