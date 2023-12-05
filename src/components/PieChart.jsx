import React from "react";
import { Pie } from "react-chartjs-2";
import { Chart as ChartJS } from "chart.js/auto";

const PieChart = ({ barData }) => {
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
      <Pie data={barData} options={options} />
    </>
  );
};

export default PieChart;
