"use client";

import React, { useContext,useState, useEffect } from "react";
import Button from "@/components/custom/Button";
import { FeedbackContext } from "@/context/FeedbackContext";
import { useRouter } from "next/navigation";
import RoadmapItem from "@/components/content/RoadmapItem";
import { IProductRequests } from "@/context/FeedbackInterface";

const Roadmap = () => {
  const router = useRouter();
  const { allFeedback } = useContext(FeedbackContext);
  const statuses = ["Planned", "In-Progress", "Live"];

  const feedbackData: Record<string, IProductRequests[]> = {};

  statuses.forEach((status) => {
    feedbackData[status] = allFeedback.filter(
      (item) => item.status.toLowerCase() === status.toLowerCase()
    );
  });

  return (
    <div className="bg-gray-background">
      <div className="max-w-[1110px] min-h-[1024px] mx-auto flex flex-col gap-12 pt-[94px] pb-[130px]">
        {/* Header */}
        <div className="bg-blue-secondary h-[113px] w-full rounded-[10px] flex items-center">
          <div className="flex items-center justify-between w-full">
            <div className="flex flex-col gap-3 items-start justify-center">
              <Button
                onClick={() => router.push("/")}
                btnColor="goback-dark"
                className="px-8 py-2 w-auto h-auto"
              >
                Go Back
              </Button>
              <h1 className="text-hxl text-white px-8">Roadmap</h1>
            </div>

            {/* Button +Add Feedback */}
            <div className="pr-4">
              <Button
                onClick={() => router.push("/new-feedback")}
                btnColor="purple-light"
              >
                + Add Feedback
              </Button>
            </div>
          </div>
        </div>

        <div className="flex flex-row gap-[30px]">
          {statuses.map((status, index) => (
            <RoadmapItem key={index} roadmapItems={feedbackData[status]} status={status} />
          ))}
        </div>
      </div>
    </div>
  );
};


export default Roadmap;
