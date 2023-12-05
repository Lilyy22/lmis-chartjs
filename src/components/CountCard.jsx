import React from "react";

const CountCard = ({ subtitle, count }) => {
  return (
    <>
      <div className="m-4 p-4 rounded-md bg-[#272953]">
        <h5 className="text-gray-400 text-sm">{subtitle}</h5>
        <h1 className="text-2xl font-bold text-white">{count}</h1>
      </div>
    </>
  );
};

export default CountCard;
