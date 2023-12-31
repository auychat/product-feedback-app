"use client";

import Button from "@/components/custom/Button";
import React, { useState, useContext } from "react";
import { useRouter } from "next/navigation";
import SelectFeature from "@/components/custom/SelectFeature";
import Image from "next/image";
import { IAddNewFeedback } from "@/context/FeedbackInterface";
import { useForm, SubmitHandler } from "react-hook-form";
import { FeedbackContext } from "@/context/FeedbackContext";

const NewFeedback = () => {
  const router = useRouter();
  const [selectedCategory, setSelectedCategory] = useState("Feature");
  const { addNewFeedback } = useContext(FeedbackContext);

  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm<IAddNewFeedback>();

  const onSubmit: SubmitHandler<IAddNewFeedback> = (data) => {
    data.category = selectedCategory.toLowerCase();
    // console.log(data);
    addNewFeedback(data);
    router.push("/");
  };

  const handleCategorySelect = (selectedOption: string) => {
    setSelectedCategory(selectedOption);
  };

  return (
    <div className="bg-gray-background">
      <div className="max-w-[540px] min-h-[1024px] mx-auto flex flex-col gap-[52px] pt-[94px] pb-[130px] xs:pb-[88px] xs:min-w-[375px] xs:max-w-[480px] xs:p-6">
        {/* Header */}
        <div className="h-[44px] w-full rounded-[10px] flex items-center xs:h-[40px]">
          <Button
            onClick={() => router.back()}
            btnColor="goback-light"
            className="px-0 py-0 w-auto h-auto xs:w-[72px] xs:px-0 xs:py-0 xs:text-b3 xs:font-bold"
          >
            Go Back
          </Button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="relative w-full min-h-[657px] bg-white rounded-[10px] shadow-sm px-[42px] py-[40px] flex flex-col gap-6 xs:px-6">
            <div className="absolute w-[56px] h-[56px] top-[-28px] xs:w-[40px] xs:h-[40px] xs:top-[-20px]">
              <Image
                src="/assets/shared/icon-new-feedback.svg"
                alt="Add new feed back icon"
                fill={true}
                className="h-auto w-auto"
              />
            </div>

            <h1 className="text-hxl text-blue-dark pt-[14px] pb-[18px] xs:pb-2 xs:text-hm">
              Create New Feedback
            </h1>

            {/* Title */}
            <div className="flex flex-col gap-4">
              <div>
                <h5 className="text-hs text-blue-dark xs:text-b3">Feedback Title</h5>
                <h5 className="text-hs text-gray-text font-normal xs:text-b3">
                  Add a short, descriptive headline
                </h5>
              </div>
              <div>
                <input
                  id="feedback-title"
                  {...register("title", { required: true })}
                  className={`w-full h-[48px] bg-gray-background p-4 rounded-[5px] inline-block align-middle text-b2 font-normal text-blue-dark outline-none xs:text-b3 ${
                    errors.title
                      ? "border border-red-500"
                      : "focus:border focus:border-blue-primary focus:ring-blue-primary overflow-hidden"
                  }`}
                />
                {errors.title && (
                  <p className="text-red-500 text-b2 font-normal xs:text-b3">
                    Can&apos;t be empty
                  </p>
                )}
              </div>
            </div>

            {/* Category */}
            <div className="flex flex-col gap-4">
              <div>
                <h5 className="text-hs text-blue-dark xs:text-b3">Category</h5>
                <h5 className="text-hs text-gray-text font-normal xs:text-b3">
                  Choose a category for your feedback
                </h5>
              </div>

              <SelectFeature
                optionType="category"
                defaultSelect="Feature"
                onOptionSelect={handleCategorySelect}
              />
              <input
                type="hidden"
                {...register("category", {
                  required: true,
                  value: selectedCategory,
                })}
              />
            </div>

            {/* Feedback Detail */}
            <div className="flex flex-col gap-4">
              <div>
                <h5 className="text-hs text-blue-dark xs:text-b3">Feedback Detail</h5>
                <h5 className="text-hs text-gray-text font-normal xs:text-b3">
                  Include any specific comments on what should be improved,
                  added, etc.
                </h5>
              </div>
              <div>
                <textarea
                  id="feedback-detail"
                  {...register("description", { required: true })}
                  className={`w-full h-[96px] bg-gray-background p-4 rounded-[5px] text-b2 font-normal text-blue-dark  overflow-hidden xs:h-[120px] xs:text-b3 ${
                    errors.description
                      ? "border border-red-500"
                      : "focus:border focus:border-blue-primary focus:ring-blue-primary"
                  }`}
                />
                {errors.description && (
                  <p className="text-red-500 text-b2 font-normal xs:text-b3">
                    Can&apos;t be empty
                  </p>
                )}
              </div>
            </div>

            {/* Button */}
            <div className="flex justify-end gap-4 xs:flex-col-reverse">
              <Button
                onClick={() => router.back()}
                btnColor="blue-dark"
                className="w-[93px] xs:w-full"
              >
                Cancel
              </Button>
              <Button
                type="submit"
                btnColor="purple-light"
                className="w-[144px] xs:w-full"
              >
                Add Feedback
              </Button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default NewFeedback;
