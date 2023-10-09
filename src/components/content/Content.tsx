import React, { useContext } from "react";
import Header from "./Header";
import NoFeedback from "./NoFeedback";
import SuggestionItem from "./SuggestionItem";
import { FeedbackContext } from "@/context/FeedbackContext";

const Content = () => {
  const { suggestProduct } = useContext(FeedbackContext);
  const suggestionCount = suggestProduct.length;
  // const suggestionCount = 0;

  return (
    <div className="w-[825px] rounded-[10px]">
      <div className="flex flex-col gap-6">
        <Header />
        {suggestionCount === 0 ? <NoFeedback /> : <SuggestionItem />}
      </div>
    </div>
  );
};

export default Content;
