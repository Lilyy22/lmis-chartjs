import React from "react";
import { Pie } from "react-chartjs-2";
import { Chart as ChartJS } from "chart.js/auto";

const PieChart = ({ pieData }) => {
  const options = {
    plugins: {
      customCanvasBackgroundColor: {
        color: "lightGreen",
      },
      legend: {
        labels: {
          color: "#C5C6D0", // Change the label color here
        },
      },
    },
  };
  return (
    <>
      <Pie data={pieData} options={options} />
    </>
  );
};

export default PieChart;
