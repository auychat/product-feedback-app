import Image from "next/image";
import React from "react";
import Button from "../custom/Button";

const NoFeedback = () => {
  return (
    <div className="w-full min-h-[600px] p-6 bg-white rounded-[10px] shadow-sm flex items-center justify-center">
      <div className="flex flex-col gap-12 items-center justify-center">
        {/* ICON Empty */}
        <div className="relative w-[130px] h-[137px]">
          <Image
            src="/assets/suggestions/illustration-empty.svg"
            alt="illustration-empty"
            fill={true}
            className="w-auto h-auto"
          />
        </div>

        {/* Text */}
        <div className="w-[410px] min-h-[189px] flex flex-col gap-4 items-center">
          <h1 className="text-hxl text-blue-dark">There is no feedback yet.</h1>
          <p className="text-b1 text-gray-text font-normal text-center">
            Got a suggestion? Found a bug that needs to be squashed? We love
            hearing about new ideas to improve our app.
          </p>
          {/* Button +Add Feedback */}
          <div className="pt-8">
            <Button
              onClick={() => console.log("Click")}
              btnColor="purple-light"
            >
              + Add Feedback
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NoFeedback;
