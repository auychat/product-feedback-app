import React, { useState, useContext, useEffect } from "react";

interface SelectProps {
  optionType: string;
  defaultSelect: string;
  onOptionSelect: (selectedOption: string) => void;
}

const SelectFeature = ({ optionType, defaultSelect, onOptionSelect }: SelectProps) => {
  let options: string[] = [];

  if (optionType === "category") {
    options = ["Feature", "UI", "UX", "Enhancement", "Bug"];
  }

  if (optionType === "status") {
    options = ["Suggestion","Planned", "In-Progress", "Live"];
  }

  const [selectedOption, setSelectedOption] = useState(defaultSelect);
  const [isOpen, setIsOpen] = useState(false);

  const handleOptionClick = (option: string) => {
    setSelectedOption(option);
    setIsOpen(false);

    // Call the callback function with the selected option
    onOptionSelect(option);
  };

  // Make first letter of selected option uppercase
  const selectedOptionCapitalized = selectedOption.charAt(0).toUpperCase() + selectedOption.slice(1);

  return (
    <div
      onClick={() => setIsOpen(!isOpen)}
      className="relative w-full h-[48px] rounded-[10px] bg-gray-background flex items-center cursor-pointer outline-none hover:border hover:border-blue-primary xs:w-full"
    >
      <div className="flex items-center justify-between w-full gap-2 px-6 ">
        <p
          className={`text-hs xs:text-b3 ${
            isOpen
              ? "text-blue-dark text-b2 font-normal xs:text-b3"
              : "text-blue-dark text-b2 font-normal xs:text-b3"
          }`}
        >
          {selectedOptionCapitalized}
        </p>

        <div className="flex items-center">
          {isOpen ? (
            <>
              {/* Icon Arrow Up */}
              <svg width="10" height="7" xmlns="http://www.w3.org/2000/svg">
                <path
                  d="M1 6l4-4 4 4"
                  stroke="#4661E6"
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
                  stroke="#4661E6"
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
        <div className="absolute z-50 top-[65px] left-0 w-[456px] h-auto bg-white rounded-[10px] shadow-[0_8px_30px_rgb(0,0,0,0.12)] xs:w-full xs:top-[56px]">
          <div className="flex flex-col ">
            {options.map((option, index) => (
              <div key={index}>
                <div
                  className="flex justify-between items-center px-6 py-4 group"
                  onClick={() => handleOptionClick(option)}
                >
                  <p className="text-b1 text-gray-text group-hover:text-purple-light xs:text-b3">
                    {option}
                  </p>
                  {selectedOption.toLowerCase() === option.toLowerCase() && (
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

export default SelectFeature;
