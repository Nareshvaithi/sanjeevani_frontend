import { Bar } from "react-chartjs-2";
import { Chart as ChartJS, BarElement, CategoryScale, LinearScale, Tooltip, Legend, Title } from "chart.js";

ChartJS.register(BarElement, CategoryScale, LinearScale, Tooltip, Legend, Title);

const data = {
  labels: ["Batch 1", "Batch 2", "Batch 3", "Batch 4", "Batch 5"],
  datasets: [
    {
      label: "Boys",
      data: [500, 600, 450, 400, 550],
      backgroundColor: "#3D5EE1", // Blue color
      barPercentage: 0.6, // Adjust bar width
      categoryPercentage: 0.6, // Adjust space between bars
    },
    {
      label: "Girls",
      data: [480, 550, 470, 420, 530],
      backgroundColor: "#82CCD5", // Light blue color
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
      text: "Number of Students", // Title at the top-left
      align: "start",
      font: { size: 16, weight: "bold" },
      padding: { top: 10, bottom: 20 },
    },
    legend: {
      position: "bottom", // Moves the legend to the bottom center
      align: "center",
      labels: { boxWidth: 20, padding: 15 },
    },
  },
  scales: {
    x: {
      barPercentage: 0.5, // Adjust bar width
      categoryPercentage: 0.6, // Adjust space between bars
    },
    y: { beginAtZero: true },
  },
};

export default function BoysAndGirlsChart() {
  return <Bar data={data} options={options} />;
}
