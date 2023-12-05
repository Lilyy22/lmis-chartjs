import React, { useState } from "react";
import BarChart from "../components/BarChart";
import { GET_CHECKERS, barData } from "../query/data";
import CountCard from "../components/CountCard";
import PieChart from "../components/PieChart";
import { useQuery } from "@apollo/client";

const Dashboard = () => {
  const { loading, error, data } = useQuery(GET_CHECKERS);

  const [barChartData, setBarChartData] = useState({
    labels: barData.map((e) => e.year),
    datasets: [
      {
        label: "sales per year",
        data: barData.map((e) => e.sales),
        backgroundColor: ["#ADD8E6", "#67B7D1"],
        borderRadius: 4,
        borderColor: "#36454F",
        color: "#fff",
      },
    ],
  });

  return (
    <>
      <div className="bg-[#16113a] h-screen">
        <h1 className="text-center text-gray-50 text-2xl font-bold pt-12">
          Weekly report EWP.
        </h1>
        <div className="container m-auto py-12">
          <div className="flex mb-12">
            <CountCard
              subtitle="thekl"
              count={data?.expatriate_work_permits_aggregate?.aggregate}
            />
            <CountCard subtitle="geds" count="142" />
          </div>

          <div className="flex justify-evenly">
            {/* barchart */}
            <div className="max-w-lg bg-[#272953] p-2 rounded-md">
              <BarChart barData={barChartData} />
            </div>
            {/* piechart */}
            <div className="max-w-md bg-[#272953] p-2 rounded-md">
              <PieChart barData={barChartData} />
            </div>
            {/* barchart */}
            {/* <div className="max-w-lg bg-[#272953] p-2 rounded-md">
              <BarChart barData={barChartData} />
            </div> */}
          </div>
        </div>
      </div>
    </>
  );
};

export default Dashboard;
