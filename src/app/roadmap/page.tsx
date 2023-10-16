"use client";

import React, { useContext, useState, useEffect, use } from "react";
import Button from "@/components/custom/Button";
import { FeedbackContext } from "@/context/FeedbackContext";
import { useRouter } from "next/navigation";
import RoadmapItem from "@/components/content/RoadmapItem";
import RoadmapItemMobile from "@/components/content/RoadmapItemMobile";
import { IProductRequests } from "@/context/FeedbackInterface";
import { useMediaQuery } from 'react-responsive'

const Roadmap = () => {
  const router = useRouter();
  const { allFeedback } = useContext(FeedbackContext);
  const statuses = ["Planned", "In-Progress", "Live"];
  const [activeTab, setActiveTab] = useState("Planned");
  const [isMobile, setIsMobile] = useState(false);

  const isMobileView = useMediaQuery({ query: '(max-width: 480px)' })

  // const isMobile = true;
  const feedbackData: Record<string, IProductRequests[]> = {};

  statuses.forEach((status) => {
    feedbackData[status] = allFeedback.filter(
      (item) => item.status.toLowerCase() === status.toLowerCase()
    );
  });

  // Function to handle click tab
  const handleClickTab = (status: string) => {
    setActiveTab(status);
  };

  useEffect(() => {
    setIsMobile(isMobileView)
  }, [isMobileView])

  return (
    <div className="bg-gray-background">
      <div className="max-w-[1110px] min-h-[1024px] mx-auto flex flex-col gap-12 pt-[94px] pb-[130px] xs:pb-[88px] xs:min-w-[375px] xs:max-w-[480px] xs:pt-0 xs:gap-0 sm:pt-[56px] sm:pb-[110px] sm:px-[39px] sm:gap-8 md:pt-[56px] md:pb-[110px] md:px-8 md:gap-8 lg:px-8 lg:gap-8 ">
        {/* Header */}
        <div className="bg-blue-secondary h-[113px] w-full rounded-[10px] flex items-center xs:rounded-none xs:h-[100px] xs:px-6 xs:fixed xs:z-10">
          <div className="flex items-center justify-between w-full">
            <div className="flex flex-col gap-3 items-start justify-center">
              <Button
                onClick={() => router.push("/")}
                btnColor="goback-dark"
                className="px-8 py-2 w-auto h-auto xs:px-0 xs:py-0"
              >
                Go Back
              </Button>
              <h1 className="text-hxl text-white px-8 xs:text-hm xs:px-0">
                Roadmap
              </h1>
            </div>

            {/* Button +Add Feedback */}
            <div className="pr-4 xs:pr-0">
              <Button
                onClick={() => router.push("/new-feedback")}
                btnColor="purple-light"
                className="xs:w-[134px] xs:text-b3 xs:px-0"
              >
                + Add Feedback
              </Button>
            </div>
          </div>
        </div>

        {/* Click Tab */}
        <div className="xs:flex items-center justify-between min-w-[327px] w-full h-[60px] mx-auto mt-[100px] sm:hidden md:hidden lg:hidden xl:hidden">
          {statuses.map((status, index) => (
            <div key={index} className="relative ">
              <button
                type="button"
                onClick={() => handleClickTab(status)}
                className=" w-[125px] h-[20px]"
              >
                <h5
                  className={`text-b3 font-bold tracking-0.18px text-blue-dark  ${
                    activeTab === status
                      ? "text-opacity-100"
                      : "text-opacity-40"
                  }`}
                >
                  {status} {"("}
                  {feedbackData[status].length}
                  {")"}
                </h5>
              </button>
              <hr
                className={`absolute top-[38px] w-[125px] ${
                  activeTab === status ? "border-2" : "border-0"
                } ${(() => {
                  switch (status) {
                    case "Planned":
                      return "border-orange-accent";
                    case "In-Progress":
                      return "border-purple-light";
                    case "Live":
                      return "border-cyan-accent";
                    default:
                      return ""; // Default case for any other status
                  }
                })()}`}
              />
            </div>
          ))}
        </div>
        <hr className="w-full sm:hidden md:hidden lg:hidden xl:hidden" />

        {/* Roadmap Item non Mobile*/}
        {!isMobile && (
          <div className="flex flex-row gap-[30px] sm:gap-[10px] sm:w-full md:w-full md:gap-3 lg:w-full lg:gap-4 xl:w-full">
            {statuses.map((status, index) => (
              <RoadmapItem
                key={index}
                roadmapItems={feedbackData[status]}
                status={status}
              />
            ))}
          </div>
        )}

        {/* Roadmap Item for Mobile */}
        {isMobile && (
          <div className="flex flex-col gap-[0px]">
            {statuses.map((status, index) => (
              <RoadmapItemMobile
                key={index}
                roadmapItems={feedbackData[status]}
                status={status}
                activeTab={activeTab}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Roadmap;
