import React from "react";
import { dummyData } from "@/app/pages/api/dummyData";
import CategoryTag from "../custom/CategoryTag";

const SuggestCategory = () => {
  return (
    <div className="w-[255px] min-h-[166px] p-6 bg-white rounded-[10px] shadow-sm">
      <div className="flex items-center flex-wrap gap-3.5">
        <CategoryTag>All</CategoryTag>
        <CategoryTag>UI</CategoryTag>
        <CategoryTag>UX</CategoryTag>
        <CategoryTag>Enhancement</CategoryTag>
        <CategoryTag>Bug</CategoryTag>
        <CategoryTag>Feature</CategoryTag>
      </div>
    </div>
  );
};

export default SuggestCategory;
