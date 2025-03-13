import { Bar } from "react-chartjs-2";
import { Chart as ChartJS, BarElement, CategoryScale, LinearScale, Tooltip, Legend, Title } from "chart.js";
import { useSelector } from "react-redux";
import { selectAllStudents } from "../../store/adminSlices/adminStudentsSlice";

ChartJS.register(BarElement, CategoryScale, LinearScale, Tooltip, Legend, Title);

export default function BoysAndGirlsChart() {
  const studentList = useSelector(selectAllStudents);

  const batchs = [...new Set(studentList.map(({ batchID }) => batchID))];

  const boysCount = batchs.map(batchID =>
    studentList.filter(({ batchID: id, gender }) => id === batchID && gender?.toLowerCase() === "male").length
  );

  const girlsCount = batchs.map(batchID =>
    studentList.filter(({ batchID: id, gender }) => id === batchID && gender?.toLowerCase() === "female").length
  );

  const data = {
    labels: batchs,
    datasets: [
      {
        label: "Boys",
        data: boysCount,
        backgroundColor: "#3D5EE1", 
        barPercentage: 0.6,
        categoryPercentage: 0.6,
      },
      {
        label: "Girls",
        data: girlsCount,
        backgroundColor: "#82CCD5", 
        barPercentage: 0.6,
        categoryPercentage: 0.6,
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      title: {
        display: true,
        text: "Number of Students",
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
