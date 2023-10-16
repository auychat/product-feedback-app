import Image from "next/image";
import React from "react";

const SuggestHead = () => {
  return (
    <div className="relative w-[255px] h-[137px] sm:w-[223px] sm:h-[178px]">
      {/* Desktop */}
      <div className="absolute w-[255px] h-[137px] top-0 sm:hidden md:hidden">
        <Image
          src="/assets/suggestions/desktop/background-header.png"
          fill={true}
          sizes="100%"
          priority={true}
          alt="background-header"
          className="w-auto h-auto rounded-[10px] z-0"
        />
        <div className="absolute top-[64px] left-[24px] flex flex-col z-10">
          <h2 className="text-hm text-white">Frontend Mentor</h2>
          <p className="text-white text-opacity-75">Feedback Board</p>
        </div>
      </div>

      {/* Tablet */}
      <div className="absolute max-w-[223px] w-full min-h-[178px] h-auto  top-0 sm:block md:block md:w-full lg:hidden xl:hidden">
        <Image
          src="/assets/suggestions/tablet/background-header.png"
          fill={true}
          sizes="100%"
          priority={true}
          alt="background-header"
          className="w-auto h-auto rounded-[10px] z-0"
        />
        <div className="absolute top-[100px] left-[24px] flex flex-col z-10">
          <h2 className="text-hm text-white">Frontend Mentor</h2>
          <p className="text-white text-opacity-75">Feedback Board</p>
        </div>
      </div>
    </div>
  );
};

export default SuggestHead;
