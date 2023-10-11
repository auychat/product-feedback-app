"use client";

import Button from "@/components/custom/Button";
import React from "react";
import { useRouter } from "next/navigation";
import SelectFeature from "@/components/custom/SelectFeature";
import Image from "next/image";

const NewFeedback = () => {
  const router = useRouter();

  return (
    <div className="bg-gray-background">
      <div className="max-w-[540px] min-h-[1024px] mx-auto flex flex-col gap-[52px] pt-[94px] pb-[130px]">
        {/* Header */}
        <div className="h-[44px] w-full rounded-[10px] flex items-center">
          <Button
            onClick={() => router.back()}
            btnColor="goback-light"
            className="px-0 py-0 w-auto h-auto"
          >
            Go Back
          </Button>
        </div>

        {/* Form */}
        <div className="relative w-full min-h-[657px] bg-white rounded-[10px] shadow-sm px-[42px] py-[40px] flex flex-col gap-6">
          <div className="absolute w-[56px] h-[56px] top-[-28px]">
            <Image
              src="/assets/shared/icon-new-feedback.svg"
              alt="Add new feed back icon"
              fill={true}
              className="h-auto w-auto"
            />
          </div>
          <h1 className="text-hxl text-blue-dark pt-[14px] pb-[18px]">
            Create New Feedback
          </h1>

          {/* Title */}
          <div className="flex flex-col gap-4">
            <div>
              <h5 className="text-hs text-blue-dark">Feedback Title</h5>
              <h5 className="text-hs text-gray-text font-normal">
                Add a short, descriptive headline
              </h5>
            </div>
            <textarea
              name="feedback-title"
              className="w-full h-[48px] bg-gray-background p-4 rounded-[5px] text-b2 font-normal text-blue-dark focus:border focus:border-blue-primary focus:ring-blue-primary overflow-hidden"
            ></textarea>
          </div>

          {/* Category */}
          <div className="flex flex-col gap-4">
            <div>
              <h5 className="text-hs text-blue-dark">Category</h5>
              <h5 className="text-hs text-gray-text font-normal">
                Choose a category for your feedback
              </h5>
            </div>
            <SelectFeature optionType="category" defaultSelect="Feature" />
          </div>

          {/* Feedback Detail */}
          <div className="flex flex-col gap-4">
            <div>
              <h5 className="text-hs text-blue-dark">Feedback Detail</h5>
              <h5 className="text-hs text-gray-text font-normal">
                Include any specific comments on what should be improved, added,
                etc.
              </h5>
            </div>
            <textarea
              name="feedback-detail"
              className="w-full h-[96px] bg-gray-background p-4 rounded-[5px] text-b2 font-normal text-blue-dark focus:border focus:border-blue-primary focus:ring-blue-primary overflow-hidden"
            ></textarea>
          </div>

          {/* Button */}
          <div className="flex justify-end gap-4">
            <Button
              onClick={() => console.log("Cancel")}
              btnColor="blue-dark"
              className="w-[93px]"
            >
              Cancel
            </Button>
            <Button
              onClick={() => console.log("Add Feedback")}
              btnColor="purple-light"
              className="w-[144px]"
            >
              Add Feedback
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NewFeedback;
