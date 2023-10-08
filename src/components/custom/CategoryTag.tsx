import React, { useState } from "react";

interface CategoryTagProps {
  children: React.ReactNode;
}

const CategoryTag = ({ children }: CategoryTagProps) => {
  const [isActive, setIsActive] = useState(false);

  const handleClickActive = () => {
    setIsActive(!isActive);
  };

  return (
    <button
      onClick={handleClickActive}
      className={`flex items-center justify-center min-w-[48px] h-[30px] py-2 px-4 bg-[#F2F4FE] hover:bg-[#CFD7FF] rounded-[10px] ${
        isActive ? "bg-[#4661E6]" : ""
      }`}
    >
      <p
        className={` font-bold text-[13px] leading-normal traking-[-0.18px] ${
          isActive ? "text-white" : "text-blue-primary"
        } `}
      >
        {children}
      </p>
    </button>
  );
};

export default CategoryTag;
