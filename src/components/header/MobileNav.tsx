import Image from "next/image";
import React, { useState } from "react";
import MobileMenuModal from "./MobileMenuModal";

const MobileNav = () => {
  const [isShowMenu, setIsShowMenu] = useState(false);

  const toggleMenu = () => {
    setIsShowMenu(!isShowMenu);
  };

  return (
    <div className="relative min-w-[375px] w-full h-[72px]">
      <div className="absolute min-w-[375px] w-full h-[72px] top-0 ">
        <Image
          src="/assets/suggestions/mobile/background-header.png"
          fill={true}
          sizes="100%"
          priority={true}
          alt="background-header"
          className="w-auto h-auto z-0"
        />
        <div className="absolute top-[20px] left-[24px] flex flex-col ">
          <h2 className="text-hm text-white xs:text-b2 xs:font-bold">
            Frontend Mentor
          </h2>
          <p className="text-white text-opacity-75 text-b3">Feedback Board</p>
        </div>

        <div
          className="absolute top-[27px] right-[24px] cursor-pointer"
          onClick={toggleMenu}
        >
          {isShowMenu ? (
            <>
              {/* Icon Close */}
              <svg width="18" height="17" xmlns="http://www.w3.org/2000/svg">
                <path
                  d="M15.01.368l2.122 2.122-6.01 6.01 6.01 6.01-2.122 2.122L9 10.622l-6.01 6.01L.868 14.51 6.88 8.5.87 2.49 2.988.368 9 6.38 15.01.37z"
                  fill="#FFF"
                  fillRule="evenodd"
                />
              </svg>
            </>
          ) : (
            <>
              {/* Icon Hamburger */}
              <svg width="20" height="17" xmlns="http://www.w3.org/2000/svg">
                <g fill="#FFF" fillRule="evenodd">
                  <path d="M0 0h20v3H0zM0 7h20v3H0zM0 14h20v3H0z" />
                </g>
              </svg>
            </>
          )}
        </div>
      </div>

      {/* Menu */}
      {isShowMenu && <MobileMenuModal />}
    </div>
  );
};

export default MobileNav;
