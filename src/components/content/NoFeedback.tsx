import Image from "next/image";
import React from "react";
import Button from "../custom/Button";
import { useRouter } from "next/navigation";

const NoFeedback = () => {
  const router = useRouter();

  return (
    <div className="w-full min-h-[600px] p-6 bg-white rounded-[10px] shadow-sm flex items-center justify-center xs:w-[327px] xs:min-h-[460px]">
      <div className="flex flex-col gap-12 items-center justify-center xs:gap-10 xs:pt-[52px]">
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
        <div className="w-[410px] min-h-[189px] flex flex-col gap-4 items-center xs:w-[278px] xs:gap-4">
          <h1 className="text-hxl text-blue-dark xs:text-hm">There is no feedback yet.</h1>
          <p className="text-b1 text-gray-text font-normal text-center xs:text-b3">
            Got a suggestion? Found a bug that needs to be squashed? We love
            hearing about new ideas to improve our app.
          </p>
          {/* Button +Add Feedback */}
          <div className="pt-8 xs:pt-2">
            <Button
              onClick={() => router.push("/new-feedback")}
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
