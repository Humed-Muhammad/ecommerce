import React, { useEffect, useState } from "react";
import TopBar from "./TopBar";

const MainDashboard = () => {
  return (
    <div className="h-full border-r border-gray-300 flex-1 flex flex-col justify-between items-center ">
      <TopBar name={"Dashboard"} />
      Main
    </div>
  );
};

export default MainDashboard;
