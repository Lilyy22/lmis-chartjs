import React from "react";
import { Bar } from "react-chartjs-2";
import { Chart as ChartJS } from "chart.js/auto";

const BarChart = ({ barData }) => {
  const options = {
    plugins: {
      customCanvasBackgroundColor: {
        color: "lightGreen",
      },
    },
    scales: {
      y: {
        beginAtZero: true,
        grid: {
          color: "#36454F",
        },
        ticks: {
          color: "#C5C6D0",
        },
      },
      x: {
        grid: {
          color: "#36454F",
        },
        ticks: {
          color: "#C5C6D0",
        },
      },
    },
    plugins: {
      legend: {
        labels: {
          color: "#C5C6D0", // Change the label color here
        },
      },
    },
  };
  return (
    <>
      <Bar data={barData} options={options} />
    </>
  );
};

export default BarChart;
