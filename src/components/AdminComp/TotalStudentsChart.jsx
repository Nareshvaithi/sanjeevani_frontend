import { Bar } from "react-chartjs-2";
import { Chart as ChartJS, BarElement, CategoryScale, LinearScale, Tooltip, Legend, Title } from "chart.js";

ChartJS.register(BarElement, CategoryScale, LinearScale, Tooltip, Legend, Title);

const data = {
  labels: ["Batch 1", "Batch 2", "Batch 3", "Batch 4", "Batch 5"],
  datasets: [
    {
      label: "Total Students",
      data: [980, 1150, 920, 820, 1080], // Replace with actual data
      backgroundColor: "#FFBB33", // Yellow color
      barPercentage: 0.5, // Adjust bar width
      categoryPercentage: 0.6, // Adjust space between bars
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

export default function TotalStudentsChart() {
  return <Bar data={data} options={options} />;
}
