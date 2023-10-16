import React from "react";
import SuggestHead from "./SuggestHead";
import SuggestCategory from "./SuggestCategory";
import SuggestStatus from "./SuggestStatus";

const Sidebar = () => {
  return (
    <div className="w-[255px] rounded-[10px] flex flex-col gap-6 sm:flex-row sm:w-full sm:gap-[10px] sm:justify-between md:flex-row md:w-full md:gap-[10px] md:justify-between">
      <SuggestHead />
      <SuggestCategory />
      <SuggestStatus />
    </div>
  );
};

export default Sidebar;
