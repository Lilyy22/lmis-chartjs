import React, { useEffect, useState } from "react";
import BarChart from "../components/BarChart";
import {
  GET_FEMALE_LABORS,
  GET_MALE_LABORS,
  GET_USERS,
  barData,
} from "../query/data";
import { CountCard, CountCardLoader } from "../components/CountCard";
import PieChart from "../components/PieChart";
import { useQuery } from "@apollo/client";

const Dashboard = () => {
  const {
    loading: usersLoading,
    error: usersError,
    data: usersData,
    refetch: refetchUsers,
  } = useQuery(GET_USERS);
  const {
    loading: maleLoading,
    error: maleError,
    data: maleData,
    refetch: refetchMaleLabors,
  } = useQuery(GET_MALE_LABORS);
  const {
    loading: femaleLoading,
    error: femaleError,
    data: femaleData,
    refetch: refetchFemaleLabors,
  } = useQuery(GET_FEMALE_LABORS);

  const pieData = [
    {
      id: 1,
      gender: "Male",
      labors:
        femaleData?.registration_namespace?.labors_aggregate?.aggregate?.count,
    },
    {
      id: 2,
      gender: "Female",
      labors:
        maleData?.registration_namespace?.labors_aggregate?.aggregate?.count,
    },
  ];

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

  const [pieChartData, setPieChartData] = useState({
    labels: pieData.map((e) => e.gender),
    datasets: [
      {
        label: "Labors per year",
        data: pieData.map((e) => e.labors),
        backgroundColor: ["#ADD8E6", "#67B7D1"],
        borderRadius: 4,
        borderColor: "#36454F",
        color: "#fff",
      },
    ],
  });

  useEffect(() => {
    refetchUsers();
    setPieChartData(pieData);
  }, []);

  return (
    <>
      {usersError && (
        <div className="text-center py-2 bg-orange-500">
          {" "}
          {usersError.message}{" "}
        </div>
      )}
      {femaleError && (
        <div className="text-center py-2 bg-orange-500">
          {" "}
          {femaleError.message}{" "}
        </div>
      )}
      <div className="bg-[#16113a] h-screen">
        <h1 className="text-center text-gray-50 text-2xl font-bold pt-12">
          LMIS Backend Dashboard
        </h1>
        <div className="container m-auto py-12">
          <div className="flex flex-wrap lg:flex-nowrap mb-12 justify-evenly">
            {usersLoading ? (
              <CountCardLoader />
            ) : (
              <CountCard subtitle="Roles" count="522">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  height="32"
                  width="36"
                  viewBox="0 0 576 512"
                  className="fill-gray-500/60"
                >
                  <path d="M432 96a48 48 0 1 0 0-96 48 48 0 1 0 0 96zM347.7 200.5c1-.4 1.9-.8 2.9-1.2l-16.9 63.5c-5.6 21.1-.1 43.6 14.7 59.7l70.7 77.1 22 88.1c4.3 17.1 21.7 27.6 38.8 23.3s27.6-21.7 23.3-38.8l-23-92.1c-1.9-7.8-5.8-14.9-11.2-20.8l-49.5-54 19.3-65.5 9.6 23c4.4 10.6 12.5 19.3 22.8 24.5l26.7 13.3c15.8 7.9 35 1.5 42.9-14.3s1.5-35-14.3-42.9L505 232.7l-15.3-36.8C472.5 154.8 432.3 128 387.7 128c-22.8 0-45.3 4.8-66.1 14l-8 3.5c-32.9 14.6-58.1 42.4-69.4 76.5l-2.6 7.8c-5.6 16.8 3.5 34.9 20.2 40.5s34.9-3.5 40.5-20.2l2.6-7.8c5.7-17.1 18.3-30.9 34.7-38.2l8-3.5zm-30 135.1l-25 62.4-59.4 59.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0L340.3 441c4.6-4.6 8.2-10.1 10.6-16.1l14.5-36.2-40.7-44.4c-2.5-2.7-4.8-5.6-7-8.6zM256 274.1c-7.7-4.4-17.4-1.8-21.9 5.9l-32 55.4L147.7 304c-15.3-8.8-34.9-3.6-43.7 11.7L40 426.6c-8.8 15.3-3.6 34.9 11.7 43.7l55.4 32c15.3 8.8 34.9 3.6 43.7-11.7l64-110.9c1.5-2.6 2.6-5.2 3.3-8L261.9 296c4.4-7.7 1.8-17.4-5.9-21.9z" />
                </svg>
              </CountCard>
            )}
            {usersLoading ? (
              <CountCardLoader />
            ) : (
              <CountCard
                subtitle="Users"
                count={usersData?.user_aggregate?.aggregate?.count}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  height="32"
                  width="36"
                  viewBox="0 0 640 512"
                  className="fill-gray-500/60"
                >
                  <path d="M144 0a80 80 0 1 1 0 160A80 80 0 1 1 144 0zM512 0a80 80 0 1 1 0 160A80 80 0 1 1 512 0zM0 298.7C0 239.8 47.8 192 106.7 192h42.7c15.9 0 31 3.5 44.6 9.7c-1.3 7.2-1.9 14.7-1.9 22.3c0 38.2 16.8 72.5 43.3 96c-.2 0-.4 0-.7 0H21.3C9.6 320 0 310.4 0 298.7zM405.3 320c-.2 0-.4 0-.7 0c26.6-23.5 43.3-57.8 43.3-96c0-7.6-.7-15-1.9-22.3c13.6-6.3 28.7-9.7 44.6-9.7h42.7C592.2 192 640 239.8 640 298.7c0 11.8-9.6 21.3-21.3 21.3H405.3zM224 224a96 96 0 1 1 192 0 96 96 0 1 1 -192 0zM128 485.3C128 411.7 187.7 352 261.3 352H378.7C452.3 352 512 411.7 512 485.3c0 14.7-11.9 26.7-26.7 26.7H154.7c-14.7 0-26.7-11.9-26.7-26.7z" />
                </svg>
              </CountCard>
            )}
            {usersLoading ? (
              <CountCardLoader />
            ) : (
              <CountCard subtitle="Active Users" count="142">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  height="26"
                  width="36"
                  viewBox="0 0 640 512"
                  className="fill-gray-500/60"
                >
                  <path d="M96 128a128 128 0 1 1 256 0A128 128 0 1 1 96 128zM0 482.3C0 383.8 79.8 304 178.3 304h91.4C368.2 304 448 383.8 448 482.3c0 16.4-13.3 29.7-29.7 29.7H29.7C13.3 512 0 498.7 0 482.3zM625 177L497 305c-9.4 9.4-24.6 9.4-33.9 0l-64-64c-9.4-9.4-9.4-24.6 0-33.9s24.6-9.4 33.9 0l47 47L591 143c9.4-9.4 24.6-9.4 33.9 0s9.4 24.6 0 33.9z" />
                </svg>
              </CountCard>
            )}
            {usersLoading ? (
              <CountCardLoader />
            ) : (
              <CountCard subtitle="Admin Users" count="842">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  height="26"
                  width="36"
                  viewBox="0 0 640 512"
                  className="fill-gray-500/60"
                >
                  <path d="M96 128a128 128 0 1 1 256 0A128 128 0 1 1 96 128zM0 482.3C0 383.8 79.8 304 178.3 304h91.4C368.2 304 448 383.8 448 482.3c0 16.4-13.3 29.7-29.7 29.7H29.7C13.3 512 0 498.7 0 482.3zM625 177L497 305c-9.4 9.4-24.6 9.4-33.9 0l-64-64c-9.4-9.4-9.4-24.6 0-33.9s24.6-9.4 33.9 0l47 47L591 143c9.4-9.4 24.6-9.4 33.9 0s9.4 24.6 0 33.9z" />
                </svg>
              </CountCard>
            )}
          </div>

          <div className="flex flex-wrap gap-8 pl-4">
            {/* barchart */}
            <div className="w-full lg:w-[40%] bg-[#272953] p-2 rounded-md">
              <BarChart barData={barChartData} />
            </div>
            {/* piechart */}
            <div className=" bg-[#272953] p-2 rounded-md">
              <PieChart pieData={pieChartData} />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Dashboard;
