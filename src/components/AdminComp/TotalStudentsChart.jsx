import { Bar } from "react-chartjs-2";
import { Chart as ChartJS, BarElement, CategoryScale, LinearScale, Tooltip, Legend, Title } from "chart.js";
import { useSelector } from "react-redux";
import { selectAllStudents } from "../../store/adminSlices/adminStudentsSlice";

ChartJS.register(BarElement, CategoryScale, LinearScale, Tooltip, Legend, Title);

export default function TotalStudentsChart() {
  const studentList = useSelector(selectAllStudents);

  // Extract unique batch IDs
  const batchs = [...new Set(studentList.map(({ batchID }) => batchID))];

  // Count students per batch
  const studentCounts = batchs.map(batchID =>
    studentList.filter(({ batchID: id }) => id === batchID).length
  );

  // Chart data
  const data = {
    labels: batchs, // Dynamic batch labels
    datasets: [
      {
        label: "Total Students",
        data: studentCounts, // Dynamic student counts
        backgroundColor: "#FFBB33", // Yellow color
        barPercentage: 0.5,
        categoryPercentage: 0.6,
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      title: {
        display: true,
        text: "Total Students in Each Batch",
        align: "start",
        font: { size: 16, weight: "bold" },
        padding: { top: 10, bottom: 20 },
      },
      legend: {
        position: "bottom",
        align: "center",
        labels: { boxWidth: 20, padding: 15 },
      },
    },
    scales: {
      x: {
        barPercentage: 0.5,
        categoryPercentage: 0.6,
      },
      y: { beginAtZero: true },
    },
  };

  return <Bar data={data} options={options} />;
}
