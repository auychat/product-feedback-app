import React,{useContext} from "react";
import CategoryTag from "../custom/CategoryTag";
import { FeedbackContext } from "@/context/FeedbackContext";

const SuggestCategory = () => {
  const { handleSelectTag } = useContext(FeedbackContext);

  return (
    <div className="w-[255px] min-h-[166px] p-6 bg-white rounded-[10px] shadow-sm">
      <div className="flex items-center flex-wrap gap-3.5">
        <CategoryTag tag="All" handleSelectTag={handleSelectTag} disabled={false} />
        <CategoryTag tag="UI" handleSelectTag={handleSelectTag} disabled={false}/>
        <CategoryTag tag="UX"handleSelectTag={handleSelectTag} disabled={false}/>
        <CategoryTag tag="Enhancement" handleSelectTag={handleSelectTag} disabled={false} />
        <CategoryTag tag="Bug" handleSelectTag={handleSelectTag} disabled={false} />
        <CategoryTag tag="Feature" handleSelectTag={handleSelectTag} disabled={false} />
      </div>
    </div>
  );
};

export default SuggestCategory;
