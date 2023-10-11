"use client";

import React from "react";

interface ButtonProps {
  onClick?: () => void;
  className?: string;
  btnColor?: string | undefined;
  type?: "button" | "submit" | "reset" | undefined;
  children: React.ReactNode;
}

const Button = ({
  onClick,
  className,
  btnColor,
  type,
  children,
}: ButtonProps) => {
  const btnClasses: { [key: string]: string } = {
    "purple-light":
      "bg-purple-light hover:bg-[#C75AF6] text-[#F2F4FE] active:bg-purple-light transition-all duration-150 ease-in-out",
    "blue-primary":
      "bg-blue-primary hover:bg-[#7C91F9] text-[#F2F4FE] active:bg-blue-primary transition-all duration-150 ease-in-out",
    "blue-dark":
      "bg-blue-dark hover:bg-[#656EA3] text-[#F2F4FE] active:bg-blue-dark transition-all duration-150 ease-in-out",
    danger:
      "bg-[#D73737] hover:bg-[#E98888] text-[#F2F4FE] active:bg-[#D73737] transition-all duration-150 ease-in-out",
    "goback-dark":
      "bg-[#373F68] hover:bg-[#373F68] text-white hover:underline hover:decoration-white text-[#F2F4FE] active:bg-opacity-75 transition-all duration-150 ease-in-out",
    "goback-light":
      "bg-inherit hover:bg-inherit text-[#647196] hover:underline hover:decoration-[#647196] active:bg-[#373F68] active:bg-opacity-5 transition-all duration-150 ease-in-out",
  };

  const btnClass = btnClasses[btnColor!];

  return (
    <button
      type={type || "button"}
      className={`text-hs rounded-[10px] w-[158px] h-[44px] px-6 py-2 hover:bg-blue-light cursor-pointer ${btnClass} ${className}`}
      onClick={onClick}
    >
      {btnColor === "goback-dark" ? (
        <div className="flex items-center justify-center gap-4">
          <svg width="7" height="10" xmlns="http://www.w3.org/2000/svg">
            <path
              d="M6 9L2 5l4-4"
              stroke="#CDD2EE"
              strokeWidth="2"
              fill="none"
              fillRule="evenodd"
            />
          </svg>
          {children}
        </div>
      ) : btnColor === "goback-light" ? (
        <div className="flex items-center justify-center gap-4">
          <svg width="7" height="10" xmlns="http://www.w3.org/2000/svg">
            <path
              d="M6 9L2 5l4-4"
              stroke="#4661E6"
              strokeWidth="2"
              fill="none"
              fillRule="evenodd"
            />
          </svg>
          {children}
        </div>
      ) : (
        <>{children}</>
      )}
    </button>
  );
};

export default Button;
