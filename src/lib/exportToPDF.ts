import html2canvas from "html2canvas";
import { quizToHtml } from "~/lib/quizToHtml";
import { jsPDF } from "jspdf";
import type { Quiz } from "./types";

const a4Width = 1240;
const a4Height = 1754;

const exportToPDF = async (quiz: Quiz) => {

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

    const sectionElements = container.querySelectorAll("section");
    const pdf = new jsPDF("p", "pt", "a4");

    for (const el of sectionElements) {
      const canvas = await html2canvas(el, { scale: 2 });
      pdf.addImage(canvas, "canvas", 0, 0, a4Width / 2, a4Height / 2);
      pdf.addPage();
    }

    pdf.deletePage(pdf.getNumberOfPages());
    pdf.save("test-paper.pdf");
  }
  catch (error) {
    console.error("Error generating PDF:", error);
  }
  finally {
    document.body.removeChild(outerContainer);
  }
};

export { a4Width, a4Height, exportToPDF };
