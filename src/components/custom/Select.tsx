import React, { useState, useContext, useEffect } from "react";
import { FeedbackContext } from "@/context/FeedbackContext";

interface SelectProps {
  //   options: string[];
  defaultOption: string;
}

const Select = ({ defaultOption }: SelectProps) => {
  const options = [
    "Most Upvotes",
    "Least Upvotes",
    "Most Comments",
    "Least Comments",
  ];

  const [selectedOption, setSelectedOption] = useState(defaultOption);
  const [isOpen, setIsOpen] = useState(false);
  const { setSortingCriteria } = useContext(FeedbackContext);

  const handleOptionClick = (option: string) => {
    setSelectedOption(option);
    setIsOpen(false);

    // Update sortingCriteria in context
    setSortingCriteria(option);
  };

  return (
    <div
      onClick={() => setIsOpen(!isOpen)}
      className="relative w-[194px] h-[72px] rounded-[10px] bg-blue-secondary flex items-center justify-center cursor-pointer"
    >
      <div className="flex items-center justify-center gap-2">
        <p
          className={`text-hs ${
            isOpen ? "text-[#F2F4FE] text-opacity-75" : "text-[#F2F4FE]"
          }`}
        >
          <span className="font-normal">Sort by : </span>
          {selectedOption}
        </p>

        <div className="flex items-center justify-center pt-1">
          {isOpen ? (
            <>
              {/* Icon Arrow Up */}
              <svg width="10" height="7" xmlns="http://www.w3.org/2000/svg">
                <path
                  d="M1 6l4-4 4 4"
                  stroke="#FFFFFF"
                  strokeWidth="2"
                  fill="none"
                  fillRule="evenodd"
                />
              </svg>
            </>
          ) : (
            <>
              {/* Icon Arrow Down */}
              <svg width="10" height="7" xmlns="http://www.w3.org/2000/svg">
                <path
                  d="M1 1l4 4 4-4"
                  stroke="#FFFFFF"
                  strokeWidth="2"
                  fill="none"
                  fillRule="evenodd"
                />
              </svg>
            </>
          )}
        </div>
      </div>

      {/* Option to select */}
      {isOpen && (
        <div className="absolute top-[86px] left-0 w-[255px] min-h-[192px] bg-white shadow-lg">
          <div className="flex flex-col ">
            {options.map((option, index) => (
              <div key={index}>
                <div
                  className="flex justify-between items-center px-6 py-4"
                  onClick={() => handleOptionClick(option)}
                >
                  <p className="text-b1 text-gray-text hover:text-purple-light">
                    {option}
                  </p>
                  {selectedOption === option && (
                    <div className="">
                      {/* Icon Check */}
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="13"
                        height="11"
                      >
                        <path
                          fill="none"
                          stroke="#AD1FEA"
                          strokeWidth="2"
                          d="M1 5.233L4.522 9 12 1"
                        />
                      </svg>
                    </div>
                  )}
                </div>
                  <hr className="w-full bg-blue-dark bg-opacity-15" />
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default Select;
