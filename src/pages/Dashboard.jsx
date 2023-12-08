import React, { useEffect, useState } from "react";
import BarChart from "../components/BarChart";
import {
  GET_ACTIVE_USERS,
  barData,
  GET_LABOR_BY_GENDER,
  GET_USER_COUNT,
  GET_LOCKED_OUT_USERS,
} from "../query/data";
import { CountCard, CountCardLoader } from "../components/CountCard";
import PieChart from "../components/PieChart";
import { useQuery } from "@apollo/client";

const Dashboard = () => {
  const current_date = new Date();
  // Calculate the day before yesterday
  const active_date = new Date();
  active_date.setDate(current_date.getDate() - 2);
  // Format active_date to "yyyy-mm-dd"
  const formattedActiveDate = active_date.toISOString().split("T")[0];
  const {
    loading: activeUsersLoading,
    error: activeUsersError,
    data: activeUsersData,
  } = useQuery(GET_ACTIVE_USERS, {
    variables: { activeDate: formattedActiveDate },
  });
  const {
    loading: genderLoading,
    error: genderError,
    data: genderData,
  } = useQuery(GET_LABOR_BY_GENDER);
  const {
    loading: userCountLoading,
    error: userCountError,
    data: userCountData,
  } = useQuery(GET_USER_COUNT);
  const {
    loading: lockedOutUsersLoading,
    error: lockedOutUsersError,
    data: lockedOutUsersData,
  } = useQuery(GET_LOCKED_OUT_USERS);

  const [pieChartData, setPieChartData] = useState(null);

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

  useEffect(() => {
    const fetchData = async () => {
      try {
        const fetchedFemaleData =
          genderData?.female?.labors_aggregate?.aggregate?.count;
        const fetchedMaleData =
          genderData?.male?.labors_aggregate?.aggregate?.count;

        setPieChartData({
          labels: ["Female", "Male"],
          datasets: [
            {
              label: "Labors per gender",
              data: [fetchedFemaleData, fetchedMaleData],
              backgroundColor: ["#ADD8E6", "#67B7D1"],
              borderRadius: 4,
              borderColor: "#36454F",
              color: "#fff",
            },
          ],
        });
      } catch (error) {
        // Handle error fetching data
      }
    };
    fetchData();
  }, [genderData]);

  return (
    <>
      {userCountLoading && (
        <div className="text-center py-2 bg-orange-500">
          {" "}
          {userCountLoading.message}{" "}
        </div>
      )}
      <div className="bg-[#0d0a26] h-screen">
        <h1 className="text-center text-gray-50 text-2xl font-bold pt-12 mb-4">
          LMIS Backend Dashboard
        </h1>
        <div className="container m-auto p-8">
          <div className="flex flex-wrap lg:flex-nowrap mb-12 gap-4 xl:gap-8 justify-center">
            {userCountLoading ? (
              <CountCardLoader />
            ) : (
              <CountCard
                subtitle="Roles"
                count={userCountData?.roles?.aggregate?.count?.toLocaleString()}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  height="32"
                  width="36"
                  viewBox="0 0 576 512"
                  className="fill-gray-400/70"
                >
                  <path d="M432 96a48 48 0 1 0 0-96 48 48 0 1 0 0 96zM347.7 200.5c1-.4 1.9-.8 2.9-1.2l-16.9 63.5c-5.6 21.1-.1 43.6 14.7 59.7l70.7 77.1 22 88.1c4.3 17.1 21.7 27.6 38.8 23.3s27.6-21.7 23.3-38.8l-23-92.1c-1.9-7.8-5.8-14.9-11.2-20.8l-49.5-54 19.3-65.5 9.6 23c4.4 10.6 12.5 19.3 22.8 24.5l26.7 13.3c15.8 7.9 35 1.5 42.9-14.3s1.5-35-14.3-42.9L505 232.7l-15.3-36.8C472.5 154.8 432.3 128 387.7 128c-22.8 0-45.3 4.8-66.1 14l-8 3.5c-32.9 14.6-58.1 42.4-69.4 76.5l-2.6 7.8c-5.6 16.8 3.5 34.9 20.2 40.5s34.9-3.5 40.5-20.2l2.6-7.8c5.7-17.1 18.3-30.9 34.7-38.2l8-3.5zm-30 135.1l-25 62.4-59.4 59.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0L340.3 441c4.6-4.6 8.2-10.1 10.6-16.1l14.5-36.2-40.7-44.4c-2.5-2.7-4.8-5.6-7-8.6zM256 274.1c-7.7-4.4-17.4-1.8-21.9 5.9l-32 55.4L147.7 304c-15.3-8.8-34.9-3.6-43.7 11.7L40 426.6c-8.8 15.3-3.6 34.9 11.7 43.7l55.4 32c15.3 8.8 34.9 3.6 43.7-11.7l64-110.9c1.5-2.6 2.6-5.2 3.3-8L261.9 296c4.4-7.7 1.8-17.4-5.9-21.9z" />
                </svg>
              </CountCard>
            )}
            {userCountLoading ? (
              <CountCardLoader />
            ) : (
              <CountCard
                subtitle="Users"
                count={userCountData?.users?.aggregate?.count?.toLocaleString()}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  height="32"
                  width="36"
                  viewBox="0 0 640 512"
                  className="fill-gray-400/70"
                >
                  <path d="M144 0a80 80 0 1 1 0 160A80 80 0 1 1 144 0zM512 0a80 80 0 1 1 0 160A80 80 0 1 1 512 0zM0 298.7C0 239.8 47.8 192 106.7 192h42.7c15.9 0 31 3.5 44.6 9.7c-1.3 7.2-1.9 14.7-1.9 22.3c0 38.2 16.8 72.5 43.3 96c-.2 0-.4 0-.7 0H21.3C9.6 320 0 310.4 0 298.7zM405.3 320c-.2 0-.4 0-.7 0c26.6-23.5 43.3-57.8 43.3-96c0-7.6-.7-15-1.9-22.3c13.6-6.3 28.7-9.7 44.6-9.7h42.7C592.2 192 640 239.8 640 298.7c0 11.8-9.6 21.3-21.3 21.3H405.3zM224 224a96 96 0 1 1 192 0 96 96 0 1 1 -192 0zM128 485.3C128 411.7 187.7 352 261.3 352H378.7C452.3 352 512 411.7 512 485.3c0 14.7-11.9 26.7-26.7 26.7H154.7c-14.7 0-26.7-11.9-26.7-26.7z" />
                </svg>
              </CountCard>
            )}
            {activeUsersLoading ? (
              <CountCardLoader />
            ) : (
              <CountCard
                subtitle="Active Users"
                count={activeUsersData?.refresh_tokens_aggregate?.aggregate?.count?.toLocaleString()}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  height="26"
                  width="36"
                  viewBox="0 0 640 512"
                  className="fill-gray-400/70"
                >
                  <path d="M96 128a128 128 0 1 1 256 0A128 128 0 1 1 96 128zM0 482.3C0 383.8 79.8 304 178.3 304h91.4C368.2 304 448 383.8 448 482.3c0 16.4-13.3 29.7-29.7 29.7H29.7C13.3 512 0 498.7 0 482.3zM625 177L497 305c-9.4 9.4-24.6 9.4-33.9 0l-64-64c-9.4-9.4-9.4-24.6 0-33.9s24.6-9.4 33.9 0l47 47L591 143c9.4-9.4 24.6-9.4 33.9 0s9.4 24.6 0 33.9z" />
                </svg>
              </CountCard>
            )}
            {userCountLoading ? (
              <CountCardLoader />
            ) : (
              <CountCard
                subtitle="Admin Users"
                count={userCountData?.admin_users?.aggregate?.count?.toLocaleString()}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  height="26"
                  width="36"
                  viewBox="0 0 640 512"
                  className="fill-gray-400/70"
                >
                  <path d="M224 0a128 128 0 1 1 0 256A128 128 0 1 1 224 0zM178.3 304h91.4c11.8 0 23.4 1.2 34.5 3.3c-2.1 18.5 7.4 35.6 21.8 44.8c-16.6 10.6-26.7 31.6-20 53.3c4 12.9 9.4 25.5 16.4 37.6s15.2 23.1 24.4 33c15.7 16.9 39.6 18.4 57.2 8.7v.9c0 9.2 2.7 18.5 7.9 26.3H29.7C13.3 512 0 498.7 0 482.3C0 383.8 79.8 304 178.3 304zM436 218.2c0-7 4.5-13.3 11.3-14.8c10.5-2.4 21.5-3.7 32.7-3.7s22.2 1.3 32.7 3.7c6.8 1.5 11.3 7.8 11.3 14.8v17.7c0 7.8 4.8 14.8 11.6 18.7c6.8 3.9 15.1 4.5 21.8 .6l13.8-7.9c6.1-3.5 13.7-2.7 18.5 2.4c7.6 8.1 14.3 17.2 20.1 27.2s10.3 20.4 13.5 31c2.1 6.7-1.1 13.7-7.2 17.2l-14.4 8.3c-6.5 3.7-10 10.9-10 18.4s3.5 14.7 10 18.4l14.4 8.3c6.1 3.5 9.2 10.5 7.2 17.2c-3.3 10.6-7.8 21-13.5 31s-12.5 19.1-20.1 27.2c-4.8 5.1-12.5 5.9-18.5 2.4l-13.8-7.9c-6.7-3.9-15.1-3.3-21.8 .6c-6.8 3.9-11.6 10.9-11.6 18.7v17.7c0 7-4.5 13.3-11.3 14.8c-10.5 2.4-21.5 3.7-32.7 3.7s-22.2-1.3-32.7-3.7c-6.8-1.5-11.3-7.8-11.3-14.8V467.8c0-7.9-4.9-14.9-11.7-18.9c-6.8-3.9-15.2-4.5-22-.6l-13.5 7.8c-6.1 3.5-13.7 2.7-18.5-2.4c-7.6-8.1-14.3-17.2-20.1-27.2s-10.3-20.4-13.5-31c-2.1-6.7 1.1-13.7 7.2-17.2l14-8.1c6.5-3.8 10.1-11.1 10.1-18.6s-3.5-14.8-10.1-18.6l-14-8.1c-6.1-3.5-9.2-10.5-7.2-17.2c3.3-10.6 7.7-21 13.5-31s12.5-19.1 20.1-27.2c4.8-5.1 12.4-5.9 18.5-2.4l13.6 7.8c6.8 3.9 15.2 3.3 22-.6c6.9-3.9 11.7-11 11.7-18.9V218.2zm92.1 133.5a48.1 48.1 0 1 0 -96.1 0 48.1 48.1 0 1 0 96.1 0z" />
                </svg>
              </CountCard>
            )}
          </div>

          <div className="flex flex-wrap gap-8 justify-center">
            {/* barchart */}
            <div className="w-full lg:w-[40%] bg-[#272953] p-2 rounded-md">
              <BarChart barData={barChartData} />
            </div>
            {/* piechart */}
            <div className=" bg-[#272953] p-2 rounded-md">
              {/* {gender} */}
              {pieChartData && <PieChart pieData={pieChartData} />}
            </div>

            <div className="bg-[#272953] p-4 rounded-md w-full lg:w-[23%]">
              <h2 className="font-bold text-gray-400">Locked out users</h2>

              <div className="flex justify-between my-4 py-2 border-b border-gray-700">
                <h2 className="font-bold text-gray-300">
                  {" "}
                  &#8901; Five or more trial
                </h2>
                <h1 className="text-2xl font-bold text-[#67b7d1]">
                  {lockedOutUsersData?.five?.aggregate?.count?.toLocaleString()}
                </h1>
              </div>

              <div className="flex justify-between my-4 py-2 border-b border-gray-700">
                <h2 className="font-bold text-gray-300">
                  {" "}
                  &#8901; Ten or more trial
                </h2>
                <h1 className="text-2xl font-bold text-[#67b7d1]">
                  {" "}
                  {lockedOutUsersData?.ten?.aggregate?.count?.toLocaleString()}
                </h1>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Dashboard;
