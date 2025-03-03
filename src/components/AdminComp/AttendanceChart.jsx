import React, { useState } from "react";
import { Bar } from "react-chartjs-2";
import { Chart as ChartJS, BarElement, CategoryScale, LinearScale, Tooltip, Legend, Title } from "chart.js";

ChartJS.register(BarElement, CategoryScale, LinearScale, Tooltip, Legend, Title);

const batchData = {
  "Batch 1": { present: [80, 70, 90, 60, 85], absent: [20, 30, 10, 40, 15] },
  "Batch 2": { present: [75, 65, 85, 70, 80], absent: [25, 35, 15, 30, 20] },
  "Batch 3": { present: [85, 75, 95, 65, 90], absent: [15, 25, 5, 35, 10] },
  "Batch 4": { present: [78, 68, 88, 58, 83], absent: [22, 32, 12, 42, 17] },
  "Batch 5": { present: [82, 72, 92, 62, 88], absent: [18, 28, 8, 38, 12] },
};

export default function AttendanceChart() {
  const [selectedBatch, setSelectedBatch] = useState("Batch 1");

  const handleBatchChange = (e) => {
    setSelectedBatch(e.target.value);
  };

  const data = {
    labels: ["Mon", "Tue", "Wed", "Thu", "Fri"],
    datasets: [
      {
        label: "Present",
        data: batchData[selectedBatch].present,
        backgroundColor: "#4CAF50",
      },
      {
        label: "Absent",
        data: batchData[selectedBatch].absent,
        backgroundColor: "#A5D6A7",
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      title: {
        display: true,
        text: "Attendance",
        align: "start",
        font: { size: 16, weight: "bold" },
        padding: { top: 10, bottom: 10 },
      },
      legend: { position: "bottom" },
    },
    scales: {
      x: { stacked: true },
      y: { stacked: true, beginAtZero: true, max: 100 },
    },
  };

  return (
    <div className="w-full mx-auto bg-white rounded-lg shadow-md font-mainFont1">
      {/* Header & Dropdown */}
      <div className="flex justify-between items-center pb-3">
        <h3 className="text-lg font-semibold text-gray-800">Attendance</h3>
        <select
          className="px-3 py-1 border rounded-md text-gray-700 focus:outline-none focus:ring-1 focus:ring-blue-500"
          value={selectedBatch}
          onChange={handleBatchChange}
        >
          {Object.keys(batchData).map((batch) => (
            <option key={batch} value={batch}>
              {batch}
            </option>
          ))}
        </select>
      </div>

      {/* Chart Container */}
      <div className="w-full h-[250px]">
        <Bar data={data} options={options} />
      </div>
    </div>
  );
}
