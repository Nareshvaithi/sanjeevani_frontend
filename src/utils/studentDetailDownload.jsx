import jsPDF from "jspdf";
import html2canvas from "html2canvas";

// Function to convert an image URL to Base64
const getBase64Image = async (imgUrl) => {
  try {
    const response = await fetch(imgUrl, { mode: "cors" }); // Ensure CORS mode is enabled
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

    const imgData = canvas.toDataURL("image/jpg");
    const pdf = new jsPDF("p", "mm", "a4");

    let imgWidth = 190;
    let imgHeight = (canvas.height * imgWidth) / canvas.width;

    // ✅ Convert external image URL to Base64
    let profileImageBase64 = await getBase64Image(imageUrls);

    if (profileImageBase64) {
      pdf.addImage(profileImageBase64, "JPG", 75, 10, 50, 50); // Student image
      pdf.text(fullName, 105, 70, { align: "center" }); // Student name below image
    }

    // ✅ Add the student details content
    pdf.addImage(imgData, "JPG", 10, profileImageBase64 ? 80 : 10, imgWidth, imgHeight);
    pdf.save(`${fullName}-Details.pdf`);
  } catch (error) {
    console.error("Error generating PDF:", error);
  }
};

export default detailsDownload;
