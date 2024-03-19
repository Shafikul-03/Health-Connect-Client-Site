import html2canvas from "html2canvas";
import { jsPDF } from "jspdf";

export const downloadPdfWithElementId = (elementId, downloadFileName) => {
  const input = document.getElementById(elementId);
  html2canvas(input, { scale: 6 }).then((canvas) => {
    saveCanvasAsPDF({
      canvas,
      fileName: downloadFileName,
    });
  });
};

export const saveCanvasAsPDF = ({
  canvas,
  fileName,
  orientation = "p",
  unit = "pt",
}) => {
  const imgData = canvas.toDataURL("image/png");
  const pdf = new jsPDF({
    orientation,
    unit,
    format: [canvas.width, canvas.height],
    compress: true,
  });
  pdf.addImage(imgData, "JPEG", 0, 0, canvas.width, canvas.height);
  pdf.save(fileName);
};
