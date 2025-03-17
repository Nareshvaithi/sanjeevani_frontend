import jsPDF from "jspdf";
import html2canvas from "html2canvas";

// Convert an image URL to Base64
const getBase64Image = async (imgUrl) => {
  try {
    const response = await fetch(imgUrl, { mode: "cors" });
    const blob = await response.blob();
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onloadend = () => resolve(reader.result);
      reader.onerror = (error) => reject(error);
      reader.readAsDataURL(blob);
    });
  } catch (error) {
    console.error("Error fetching image:", error);
    return null;
  }
};

const detailsDownload = async (fullName, imageUrls) => {
  const element = document.getElementById("student-details");

  if (!element) {
    console.error("Student details element not found!");
    return;
  }

  try {
    const canvas = await html2canvas(element, {
      scale: 2,
      useCORS: true,
      allowTaint: true,
    });

    const imgData = canvas.toDataURL("image/jpeg");
    const pdf = new jsPDF("p", "mm", "a4");

    let imgWidth = 190;
    let imgHeight = (canvas.height * imgWidth) / canvas.width;

    let yOffset = 10;

    // ✅ Add Profile Image (if available)
    let profileImageBase64 = await getBase64Image(imageUrls);
    if (profileImageBase64) {
      pdf.addImage(profileImageBase64, "JPEG", 75, yOffset, 50, 50); // Student image
      pdf.text(fullName, 105, yOffset + 60, { align: "center" }); // Name
      yOffset += 70; // Move down
    }

    // ✅ Add HTML content
    if (imgHeight > 270) {
      pdf.addImage(imgData, "JPEG", 10, yOffset, imgWidth, 270);
      pdf.addPage();
      pdf.addImage(imgData, "JPEG", 10, 10, imgWidth, imgHeight - 270);
    } else {
      pdf.addImage(imgData, "JPEG", 10, yOffset, imgWidth, imgHeight);
    }

    pdf.save(`${fullName}-Details.pdf`);
  } catch (error) {
    console.error("Error generating PDF:", error);
  }
};

export default detailsDownload;
