import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";
import { useDispatch } from "react-redux";
import { showToast } from "../store/tostifySlice";

export const handleDownloadPDF = (studentList) => {
  const dispatch = useDispatch();
  if (!Array.isArray(studentList) || studentList.length === 0) {
    dispatch(showToast({ message: "No Students Available for Download", type: "error" }));
    return;
  }

  console.log("Generating PDF for students:", studentList);

  const doc = new jsPDF();
  doc.text("Student List", 14, 15);

 
  const columns = ["ID", "Name", "Email", "Gender", "Department", "Status"];
  const rows = studentList.map(({ id, name, email, gender, department, status }) => [
    id || "N/A",
    name || "N/A",
    email || "N/A",
    gender || "N/A",
    department || "N/A",
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
