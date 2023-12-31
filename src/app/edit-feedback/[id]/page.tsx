"use client";

import Image from "next/image";
import React, { useState, useContext } from "react";
import { useRouter, useParams, notFound } from "next/navigation";
import Button from "@/components/custom/Button";
import SelectFeature from "@/components/custom/SelectFeature";
import { FeedbackContext } from "@/context/FeedbackContext";
import { IEditFeedback } from "@/context/FeedbackInterface";
import { useForm, Controller, set } from "react-hook-form";
import DeleteModal from "@/components/custom/DeleteModal";
import NotFound from "@/components/custom/NotFound";

const EditFeedback = () => {
  const router = useRouter();
  const params = useParams();
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

  const { allFeedback, editFeedback } = useContext(FeedbackContext);
  // React Hook Form
  const {
    control,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<IEditFeedback>();

  const selectedFeedback = params?.id
    ? allFeedback.filter((feedback) => feedback.id === +params.id)
    : [];

    const initialCategory = selectedFeedback[0]?.category;
    const initialStatus = selectedFeedback[0]?.status;

    const [selectedCategory, setSelectedCategory] = useState(initialCategory);
    const [selectedStatus, setSelectedStatus] = useState(initialStatus);

    // console.log("initialCategory", initialCategory)
    // console.log("initialStatus", initialStatus)
    // console.log("selectedFeedback", selectedFeedback)

  const onSubmit = async (data: IEditFeedback) => {
    try {
      data.id = selectedFeedback[0]?.id;
      data.category = selectedCategory.toLowerCase();
      data.status = selectedStatus.toLowerCase();
      // console.log("data from editPage:",data);
      await editFeedback(data);

      if (
        data.status === "planned" ||
        data.status === "in-progress" ||
        data.status === "live"
      ) {
        router.push("/roadmap");
      } else {
        router.push("/");
      }

    } catch (error) {
      console.log(error);
    }
  };

  const handleCategorySelect = (selectedOption: string) => {
    setSelectedCategory(selectedOption);
  };

  const handleStatusSelect = (selectedOption: string) => {
    setSelectedStatus(selectedOption);
  };

  const handleDeleteFeedback =  () => {
    setIsDeleteModalOpen(true);
  };

  const handleDeleteModalClose = () => {
    setIsDeleteModalOpen(false);
  };

  // Return 404 if the feedback is not found
  if (selectedFeedback.length === 0) {
    return(
      <>
        <NotFound />
      </>
    )
  }

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
                src="/assets/shared/icon-edit-feedback.svg"
                alt="Edit feed back icon"
                fill={true}
                className="h-auto w-auto"
              />
            </div>
            <h1 className="text-hxl text-blue-dark pt-[14px] pb-[18px] xs:pb-2 xs:text-hm">
              Editing {"'"}{selectedFeedback[0]?.title}{"'"}
            </h1>

            {/* Title */}
            <div className="flex flex-col gap-4">
              <div>
                <h5 className="text-hs text-blue-dark xs:text-b3 xs:font-bold xs:tracking-[-0.18px]">Feedback Title</h5>
                <h5 className="text-hs text-gray-text font-normal xs:text-b3">
                  Add a short, descriptive headline
                </h5>
              </div>
              <Controller
                name="title"
                control={control}
                defaultValue={selectedFeedback[0]?.title}
                rules={{ required: true }}
                render={({ field }) => (
                  <input
                    {...field}
                    className="w-full h-[48px] bg-gray-background p-4 rounded-[5px] text-b2 font-normal text-blue-dark focus:border focus:border-blue-primary focus:ring-blue-primary outline-none xs:text-b3"
                  />
                )}
              />
            </div>

            {/* Category */}
            <div className="flex flex-col gap-4">
              <div>
                <h5 className="text-hs text-blue-dark xs:text-b3 xs:font-bold xs:tracking-[-0.18px]">Category</h5>
                <h5 className="text-hs text-gray-text font-normal xs:text-b3">
                  Choose a category for your feedback
                </h5>
              </div>
              <SelectFeature
                optionType="category"
                defaultSelect={initialCategory}
                onOptionSelect={handleCategorySelect}
              />
            </div>

            {/* Update Status */}
            <div className="flex flex-col gap-4">
              <div>
                <h5 className="text-hs text-blue-dark xs:text-b3 xs:font-bold xs:tracking-[-0.18px]">Update Status</h5>
                <h5 className="text-hs text-gray-text font-normal xs:text-b3">
                  Change feedback state
                </h5>
              </div>
              <SelectFeature
                optionType="status"
                defaultSelect={initialStatus}
                onOptionSelect={handleStatusSelect}
              />
            </div>

            {/* Feedback Detail */}
            <div className="flex flex-col gap-4">
              <div>
                <h5 className="text-hs text-blue-dark xs:text-b3 xs:font-bold xs:tracking-[-0.18px]">Feedback Detail</h5>
                <h5 className="text-hs text-gray-text font-normal xs:text-b3">
                  Include any specific comments on what should be improved,
                  added, etc.
                </h5>
              </div>
              <Controller
                name="description"
                control={control}
                defaultValue={selectedFeedback[0]?.description}
                rules={{ required: true }}
                render={({ field }) => (
                  <textarea
                    {...field}
                    className="w-full h-[96px] bg-gray-background p-4 rounded-[5px] text-b2 font-normal text-blue-dark focus:border focus:border-blue-primary focus:ring-blue-primary overflow-hidden xs:h-[120px] xs:text-b3"
                  ></textarea>
                )}
              />
            </div>

            {/* Button */}
            <div className="flex items-center justify-between w-full xs:gap-4 xs:flex-col-reverse">
              <Button
                onClick={() => {
                  handleDeleteFeedback();
                }}
                btnColor="danger"
                className="w-[93px] xs:w-full"
              >
                Delete
              </Button>
              {/* Open Confirm Delete Modal */}
              {isDeleteModalOpen && (
                <DeleteModal
                  selectFeedback={selectedFeedback[0]}
                  closeDeleteModal={handleDeleteModalClose}
                />
              )}

              <div className="flex justify-end gap-4 xs:flex-col-reverse xs:w-full">
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
                  Save Changes
                </Button>
              </div>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditFeedback;
