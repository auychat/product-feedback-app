import React, { useState } from "react";

const Upvote = () => {
  const [upvote, setUpvote] = useState(0);

  const handleUpvoteClick = () => {
    setUpvote(upvote + 1);
  };

  return (
    <button
      onClick={handleUpvoteClick}
      className={`group w-[40px] h-[53px] bg-[#F2F4FE] hover:bg-[#CFD7FF] active:bg-[#4661E6] rounded-[10px] `}
    >
      <div className="flex flex-col gap-2 items-center group-active:text-white group-active:stroke-white">
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
