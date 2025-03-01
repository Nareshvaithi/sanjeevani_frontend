import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";

export const handleDownloadPDF = (studentList) => {
  if (!Array.isArray(studentList) || studentList.length === 0) {
    alert("No student data available for download.");
    return;
  }

  console.log("Generating PDF for students:", studentList);

  const doc = new jsPDF();
  doc.text("Student List", 14, 15);

  const columns = ["ID", "Name", "Email", "Gender", "Department", "Payment", "Status"];
  const rows = studentList.map(({ id, name, email, gender, department, payment, status }) => [
    id || "N/A",
    name || "N/A",
    email || "N/A",
    gender || "N/A",
    department || "N/A",
    payment || "N/A",
    status || "N/A",
  ]);

  // Use autoTable function separately
  autoTable(doc, {
    head: [columns],
    body: rows,
    startY: 20,
  });

  doc.save("Student_List.pdf");
};
