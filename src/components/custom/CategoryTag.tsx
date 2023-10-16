import React, { useState, useEffect, useContext } from "react";
import { FeedbackContext } from "@/context/FeedbackContext";

interface CategoryTagProps {
  tag: string;
  handleSelectTag?: (tag: string) => void;
  disabled?: boolean;
  preventActive?: boolean;
}

const CategoryTag = ({
  tag,
  handleSelectTag,
  preventActive = false,
  disabled = false,
}: CategoryTagProps) => {
  const [isActive, setIsActive] = useState(false);
  const { sortByCategoryTag } = useContext(FeedbackContext);

  // Set the active state to "All" when first render
  useEffect(() => {
    setIsActive(sortByCategoryTag.includes(tag));
  }, [tag, sortByCategoryTag]);

  const handleClickActive = () => {
    if (!disabled) {
      setIsActive(!isActive);
      handleSelectTag!(tag);
    }
  };

  return (
    <button
      onClick={handleClickActive}
      className={`flex items-center justify-center min-w-[48px] h-[30px] py-2 px-4 hover:bg-[#CFD7FF] rounded-[10px] ${
        isActive && !preventActive ? "bg-[#4661E6] hover:bg-[#4661E6]" : "bg-[#F2F4FE]"
      }`}
    >
      <p
        className={` font-bold text-b3 text-[13px] leading-normal traking-[-0.18px] ${
          isActive && !preventActive ? "text-white" : "text-blue-primary"
        } `}
      >
        {tag === "Ui" ? "UI" : tag === "Ux" ? "UX" : tag}
      </p>
    </button>
  );
};

export default CategoryTag;
