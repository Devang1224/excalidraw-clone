import jsPDF from "jspdf";

export const exportToPdf = async () => {
    const canvas = document.querySelector("canvas");
  
    if (!canvas) return;
  
    const userConfirmation = await confirm(
      "Are you sure you want to export the canvas to a PDF?"
    );
  
    if (userConfirmation) {

      const doc = new jsPDF({
        orientation: "landscape",
        unit: "px",
        format: [canvas.width, canvas.height],
      });
  
      const data = canvas.toDataURL();
  
      doc.addImage(data, "PNG", 0, 0, canvas.width, canvas.height);
  
      doc.save("canvas.pdf");
    } 
  };
