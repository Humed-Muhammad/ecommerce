import React from "react";

const TopBar = ({ name }) => {
  return (
    <div className="w-full bg-white shadow-md h-16 py-2 flex justify-around items-center">
      <h1 className="text-xl text-gray-600">{name}</h1>
    </div>
  );
};

export default TopBar;
