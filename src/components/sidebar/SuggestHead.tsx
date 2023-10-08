import Image from "next/image";
import React from "react";

const SuggestHead = () => {
  return (
    <div className="relative w-[255px] h-[137px]">
      <div className="absolute w-[255px] h-[137px] top-0 ">
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
    </div>
  );
};

export default SuggestHead;
