import jsPDF from "jspdf";
import logo from "../assets/images/logo.png";
import medal from "../assets/images/medal.png";
import { IonIcon } from '@ionic/react';
import { downloadOutline  } from 'ionicons/icons';

const AdoptionCertificate = ({ pet }) => {
  const handleDownloadPDF = async () => {
    const doc = new jsPDF({
      orientation: "landscape",
      unit: "mm",
      format: "a4",
    });

    const centerX = 148.5;
    const rightX = 270;

    
    doc.setFillColor(245, 245, 245);
    doc.rect(0, 0, 297, 210, "F");

    
    try {
      const logoImg = await loadImage(logo);
      doc.addImage(logoImg, "PNG", centerX - 15, 15, 30, 30);
    } catch (e) {
      console.error("Logo load error", e);
    }

    
    doc.setFont("helvetica", "bold");
    doc.setFontSize(24);
    doc.setTextColor(40, 40, 40);
    doc.text("CERTIFICATE OF ADOPTION", centerX, 55, { align: "center" });

    
    doc.setFontSize(12);
    doc.setFont("helvetica", "normal");
    doc.text("This certifies that", centerX, 65, { align: "center" });

    
    doc.setFontSize(20);
    doc.setFont("helvetica", "bold");
    doc.setTextColor(0, 102, 204);
    doc.text(pet.name.toUpperCase(), centerX, 75, { align: "center" });

    
    doc.setFontSize(12);
    doc.setFont("helvetica", "normal");
    doc.setTextColor(60, 60, 60);
    doc.text(
      "has found a forever home through the Virtual Pet Adoption Center",
      centerX,
      85,
      { align: "center" }
    );

    
    doc.setFont("helvetica", "bold");
    doc.setFontSize(16);
    doc.setTextColor(30, 30, 30);
    doc.text("Certified Adopted Pet", centerX, 100, { align: "center" });

    
    doc.setFont("helvetica", "normal");
    doc.setFontSize(12);
    doc.text(`Species: ${pet.species}`, centerX, 115, { align: "center" });
    doc.text(
      `Breed: ${pet.breed || "Mixed"} | Age: ${pet.age} years`,
      centerX,
      122,
      { align: "center" }
    );

    
    const adoptionDate = new Date().toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
    const certNumber = `VPAC-${Date.now().toString().slice(-6)}`;

    doc.setFontSize(10);
    doc.setTextColor(90, 90, 90);
    doc.text(`Date Issued: ${adoptionDate}`, centerX, 150, { align: "center" });

    
    doc.setFontSize(12);
    doc.text(`Certificate ID: ${certNumber}`, centerX, 157, { align: "center" });

    
    try {
      const medalImg = await loadImage(medal);
      const medalW = 50;
      const medalH = 50;
      const medalX = rightX - medalW;
      const medalY = 140; 

      doc.addImage(medalImg, "PNG", medalX, medalY, medalW, medalH);

      
      doc.setFont("helvetica", "italic");
      doc.setFontSize(14);
      doc.setTextColor(0, 0, 0);
      doc.text("Authorized by VPAC", rightX, medalY + medalH + 5, {
        align: "right",
      });
    } catch (e) {
      console.error("Medal image load error", e);
    }

    
    doc.setFontSize(9);
    doc.setTextColor(120, 120, 120);
    doc.text("This certificate is valid without signature or seal", centerX, 200, {
      align: "center",
    });

    doc.save(`${pet.name}-Adoption-Certificate.pdf`);
  };

  const loadImage = (src) => {
    return new Promise((resolve, reject) => {
      const img = new Image();
      img.onload = () => resolve(img);
      img.onerror = reject;
      img.src = src;
    });
  };

  return (
    <div className="flex justify-center mt-4">
      <button
        onClick={handleDownloadPDF}
        className="px-6 py-3 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg flex items-center justify-center gap-2 font-medium transition-colors"
      >
       <span className="text-white">
  <IonIcon icon={downloadOutline } style={{ fontSize: '20px' }}/>
</span>
        <span>Get Adoption Certificate</span>
      </button>
    </div>
  );
};

export default AdoptionCertificate;
