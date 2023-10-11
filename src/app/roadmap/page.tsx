"use client";

import React, { useContext } from "react";
import Button from "@/components/custom/Button";
import { FeedbackContext } from "@/context/FeedbackContext";
import CategoryTag from "@/components/custom/CategoryTag";
import Upvote from "@/components/custom/Upvote";
import Comment from "@/components/custom/Comment";
import { useRouter } from "next/navigation";

const Roadmap = () => {
  const router = useRouter();
  const { nonSuggestProduct } = useContext(FeedbackContext);
  console.log("nonSuggestProduct", nonSuggestProduct)
  const plannedStatus = nonSuggestProduct.filter(
    (product) => product.status === "planned"
  );
  const inProgressStatus = nonSuggestProduct.filter(
    (product) => product.status === "in-progress"
  );
  const liveStatus = nonSuggestProduct.filter(
    (product) => product.status === "live"
  );

  return (
    <div className="bg-gray-background">
      <div className="max-w-[1110px] min-h-[1367px] mx-auto flex flex-col gap-12 pt-[94px]">
        {/* Header */}
        <div className="bg-blue-secondary h-[113px] w-full rounded-[10px] flex items-center">
          <div className="flex items-center justify-between w-full">
            <div className="flex flex-col gap-3 items-start justify-center">
              <Button
                onClick={() => router.back()}
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
                onClick={() => console.log("Click")}
                btnColor="purple-light"
              >
                + Add Feedback
              </Button>
            </div>
          </div>
        </div>

        <div className="flex flex-row gap-[30px]">
          {/* Column 1 Planned */}
          <div className="min-w-[350px] flex flex-col gap-6">
            <div className="mb-2">
              <h3 className="text-hm text-blue-dark">
                Planned ({plannedStatus.length})
              </h3>
              <p className="text-b1 text-gray-text">
                Ideas prioritized for research
              </p>
            </div>
            {plannedStatus.map((item) => (
              <div
                key={item.id}
                className="bg-white min-h-[272px] rounded-[10px] shadow-sm"
              >
                <hr className="h-[6px] w-full bg-orange-accent rounded-t-[10px]" />

                {/* Status */}
                <div className="p-8 flex flex-col gap-4">
                  <div className="flex items-center gap-3">
                    <div
                      className={`w-[8px] h-[8px] rounded-full bg-orange-accent`}
                    />
                    <p className="text-b1 text-gray-text font-normal">
                      {item.status.charAt(0).toUpperCase() +
                        item.status.slice(1)}
                    </p>
                  </div>

                  {/* Title Description */}
                  <div>
                    <h3 className="text-hm text-blue-dark">{item.title}</h3>
                    <p className="text-b1 text-gray-text">{item.description}</p>
                  </div>

                  {/* Category */}
                  <div>
                    <CategoryTag>
                      {item.category.charAt(0).toUpperCase() +
                        item.category.slice(1)}
                    </CategoryTag>
                  </div>

                  {/* Upvote and Comment */}
                  <div className="flex justify-between items-center">
                    <Upvote initialUpvotes={item.upvotes} feedbackId={item.id} />
                    <Comment commentCount={item.comments?.length} />
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Column 2 In-Progress */}
          <div className="min-w-[350px] flex flex-col gap-6">
            <div className="mb-2">
              <h3 className="text-hm text-blue-dark">
                In-Progress ({inProgressStatus.length})
              </h3>
              <p className="text-b1 text-gray-text">
                Currently being developed
              </p>
            </div>
            {inProgressStatus.map((item) => (
              <div
                key={item.id}
                className="bg-white min-h-[272px] rounded-[10px] shadow-sm"
              >
                <hr className="h-[6px] w-full bg-purple-light rounded-t-[10px]" />

                {/* Status */}
                <div className="p-8 flex flex-col gap-4">
                  <div className="flex items-center gap-3">
                    <div
                      className={`w-[8px] h-[8px] rounded-full bg-purple-light`}
                    />
                    <p className="text-b1 text-gray-text font-normal">
                      {item.status.charAt(0).toUpperCase() +
                        item.status.slice(1)}
                    </p>
                  </div>

                  {/* Title Description */}
                  <div>
                    <h3 className="text-hm text-blue-dark">{item.title}</h3>
                    <p className="text-b1 text-gray-text">{item.description}</p>
                  </div>

                  {/* Category */}
                  <div>
                    <CategoryTag>
                      {item.category.charAt(0).toUpperCase() +
                        item.category.slice(1)}
                    </CategoryTag>
                  </div>

                  {/* Upvote and Comment */}
                  <div className="flex justify-between items-center">
                    <Upvote initialUpvotes={item.upvotes}  feedbackId={item.id}/>
                    <Comment commentCount={item.comments?.length} />
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Column 3 Live*/}
          <div className="min-w-[350px] flex flex-col gap-6">
            <div className="mb-2">
              <h3 className="text-hm text-blue-dark">
                Live ({liveStatus.length})
              </h3>
              <p className="text-b1 text-gray-text">Released features</p>
            </div>
            {liveStatus.map((item) => (
              <div
                key={item.id}
                className="bg-white min-h-[272px] rounded-[10px] shadow-sm"
              >
                <hr className="h-[6px] w-full bg-cyan-accent rounded-t-[10px]" />

                {/* Status */}
                <div className="p-8 flex flex-col gap-4">
                  <div className="flex items-center gap-3">
                    <div
                      className={`w-[8px] h-[8px] rounded-full bg-cyan-accent`}
                    />
                    <p className="text-b1 text-gray-text font-normal">
                      {item.status.charAt(0).toUpperCase() +
                        item.status.slice(1)}
                    </p>
                  </div>

                  {/* Title Description */}
                  <div>
                    <h3 className="text-hm text-blue-dark">{item.title}</h3>
                    <p className="text-b1 text-gray-text">{item.description}</p>
                  </div>

                  {/* Category */}
                  <div>
                    <CategoryTag>
                      {item.category.charAt(0).toUpperCase() +
                        item.category.slice(1)}
                    </CategoryTag>
                  </div>

                  {/* Upvote and Comment */}
                  <div className="flex justify-between items-center">
                    <Upvote initialUpvotes={item.upvotes}  feedbackId={item.id}/>
                    <Comment commentCount={item.comments?.length} />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Roadmap;
