import React from "react";
import SuggestHead from "./SuggestHead";
import SuggestCategory from "./SuggestCategory";
import SuggestStatus from "./SuggestStatus";

const Sidebar = () => {
  return (
    <div className="w-[255px] rounded-[10px] flex flex-col gap-6">
      <SuggestHead />
      <SuggestCategory />
      <SuggestStatus />
    </div>
  );
};

export default Sidebar;
