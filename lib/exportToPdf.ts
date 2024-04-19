import jsPDF from "jspdf";

export const exportToPdf = async () => {
    const canvas = document.querySelector("canvas");
  
    if (!canvas) return;
  
    // Prompt user for confirmation 
    const userConfirmation = await confirm(
      "Are you sure you want to export the canvas to a PDF?"
    );
  
    if (userConfirmation) {
      // Use jspdf
      const doc = new jsPDF({
        orientation: "landscape",
        unit: "px",
        format: [canvas.width, canvas.height],
      });
  
      // Get the canvas data url
      const data = canvas.toDataURL();
  
      // Add the image to the pdf
      doc.addImage(data, "PNG", 0, 0, canvas.width, canvas.height);
  
      // Download the pdf
      doc.save("canvas.pdf");
    } 
  };