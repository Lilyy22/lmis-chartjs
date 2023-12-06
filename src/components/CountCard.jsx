import React from "react";

export const CountCard = ({ subtitle, count, children }) => {
  return (
    <>
      <div className="p-4 xl:p-6 mb-4 rounded-md bg-[#272953] flex justify-between w-full md:w-[45%] lg:w-60 xl:w-72 border-t border-gray-700">
        <div>
          <h5 className="text-gray-400 text-sm font-bold">{subtitle}</h5>
          <h1 className="text-2xl font-bold text-[#67b7d1]">
            {" "}
            &#8901; {count}
          </h1>
        </div>
        <div className="my-auto">{children}</div>
      </div>
    </>
  );
};

export const CountCardLoader = () => {
  return (
    <>
      <div className="p-4 xl:p-6 mb-4 rounded-md bg-[#272953] flex justify-between w-full md:w-[45%] lg:w-60 xl:w-72 border-t border-gray-700 animate-pulse">
        <div>
          <h5 className="bg-gray-500/70 rounded w-8 p-1 mb-3"></h5>
          <h1 className="rounded bg-[#67b7d1]/70 w-8 py-3"></h1>
        </div>
        <div className="my-auto bg-gray-500/70 rounded w-8 p-4"></div>
      </div>
    </>
  );
};

export const PieChartLoader = () => {
  return (
    <>
      <div className="p-4 xl:p-6 mb-4 rounded-md bg-[#272953] flex justify-between w-full md:w-[45%] lg:w-60 xl:w-72 border-t border-gray-700 animate-pulse">
        <div>
          <h5 className="bg-gray-500/70 rounded w-8 p-1 mb-3"></h5>
          <h1 className="rounded bg-[#67b7d1]/70 w-8 py-3"></h1>
        </div>
        <div className="my-auto bg-gray-500/70 rounded w-8 p-4"></div>
      </div>
    </>
  );
};
