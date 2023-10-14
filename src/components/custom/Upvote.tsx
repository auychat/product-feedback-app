import React, { useState, useContext, useEffect } from "react";
import { FeedbackContext } from "@/context/FeedbackContext";

interface UpvoteProps {
  initialUpvotes?: number;
  feedbackId?: number;
}

const Upvote = ({ initialUpvotes, feedbackId }: UpvoteProps) => {
  const [upvote, setUpvote] = useState(initialUpvotes);
  const { updateUpvote, allFeedback } = useContext(FeedbackContext);

  const handleUpvoteClick = () => {
    if (upvote === undefined) {
      setUpvote(0);
    } else {
      feedbackId && updateUpvote(feedbackId);
    }
  };

  const upvotesNumber = allFeedback.find(
    (feedback) => feedback.id === feedbackId
  )?.upvotes;

  // Update upvote when the upvote state changes
  useEffect(() => {
    const upvoteValue = allFeedback.find(
      (feedback) => feedback.id === feedbackId
    )?.upvotes;
    setUpvote(upvoteValue);
  }, [allFeedback, feedbackId, upvotesNumber]);

  return (
    <button
      onClick={handleUpvoteClick}
      className={`group w-[40px] h-[53px] bg-[#F2F4FE] hover:bg-[#CFD7FF] active:bg-[#4661E6] rounded-[10px] xs:w-[69px] xs:h-[32px]`}
    >
      <div className="flex flex-col gap-2 items-center group-active:text-white group-active:stroke-white xs:flex-row xs:items-center xs:justify-center">
        <svg
          width="10"
          height="7"
          xmlns="http://www.w3.org/2000/svg"
          className="group-active:text-white stroke-[#4661E6] group-active:stroke-white"
        >
          <path
            d="M1 6l4-4 4 4"
            // stroke="#4661E6"
            strokeWidth="2"
            fill="none"
            fillRule="evenodd"
          />
        </svg>
        <p className="text-blue-dark font-bold text-[13px] leading-normal traking-[-0.18px] group-active:text-white">
          {upvote}
        </p>
      </div>
    </button>
  );
};

export default Upvote;
