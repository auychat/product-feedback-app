import React from "react";
import SuggestCategory from "../sidebar/SuggestCategory";
import SuggestStatus from "../sidebar/SuggestStatus";

const MobileMenuModal = () => {
  return (
    <div className="fixed top-[72px] inset-0 z-50 overflow-auto bg-black bg-opacity-50 flex justify-end items-center">
      <div className="bg-gray-background w-[271px] h-full flex flex-col items-center gap-6 p-6">
        <SuggestCategory />
        <SuggestStatus />
      </div>
    </div>
  );
};

export default MobileMenuModal;
