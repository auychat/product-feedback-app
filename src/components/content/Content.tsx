import React, { useContext } from "react";
import Header from "../header/Header";
import NoFeedback from "./NoFeedback";
import SuggestionItem from "./SuggestionItem";
import { FeedbackContext } from "@/context/FeedbackContext";

const Content = () => {
  const { suggestProduct, sortSuggestProduct } = useContext(FeedbackContext);
  const suggestionCount = suggestProduct.length;
  // const suggestionCount = 0;

  return (
    <div className="rounded-[10px] xs:min-w-[327px] ">
      <div className="flex flex-col gap-6">
        <Header />
        <div className="xs:px-6 flex flex-col gap-4">
          {suggestionCount === 0 ? (
            <NoFeedback />
          ) : (
            <SuggestionItem feedbackItems={sortSuggestProduct} />
          )}
        </div>
      </div>
    </div>
  );
};

export default Content;
