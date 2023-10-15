'use client'

import React, {useEffect, useState} from "react";
import Link from "next/link";
import CategoryTag from "../custom/CategoryTag";
import Upvote from "../custom/Upvote";
import Comment from "../custom/Comment";
import { IProductRequests } from "@/context/FeedbackInterface";

interface RoadmapItemMobileProps {
  roadmapItems: IProductRequests[];
  status: string;
  activeTab: string;
}

const RoadmapItemMobile = ({
  roadmapItems,
  status,
  activeTab,
}: RoadmapItemMobileProps) => {


  const CommentCount = roadmapItems?.map((product) => {
    let totalComment = product.comments?.length ?? 0;
    if (product.comments) {
      product.comments.forEach((comment) => {
        totalComment += comment.replies?.length ?? 0;
      });
    }
    return totalComment;
  });

  // Filter the roadmap items based on the active tab
  const filteredRoadmapItems = roadmapItems.filter(
    (item) => item.status.toLowerCase() === activeTab.toLowerCase()
  );

  return (
    <>
      {filteredRoadmapItems.map((item, index) => (
        <div
          className="pt-6 min-w-[350px] flex flex-col gap-4 px-6"
          key={item.id}
        >
          {index === 0 && (
            <div className="mb-2">
              <h3 className="text-hm text-blue-dark">
                {activeTab} ({filteredRoadmapItems.length})
              </h3>
              <p className="text-b3 text-gray-text">
                {activeTab === "Planned"
                  ? "Ideas prioritized for research"
                  : activeTab === "In-Progress"
                  ? "Currently being developed"
                  : "Released features"}
              </p>
            </div>
          )}
          <div className="bg-white min-h-[233px] rounded-[10px] shadow-sm flex flex-col gap-0">
            <hr
              className={`h-[6px] w-full rounded-t-[10px] ${(() => {
                switch (status) {
                  case "Planned":
                    return "bg-orange-accent";
                  case "In-Progress":
                    return "bg-purple-light";
                  case "Live":
                    return "bg-cyan-accent";
                  default:
                    return ""; // Default case for any other status
                }
              })()}`}
            />

            {/* Status */}
            <div className="p-6 flex flex-col gap-4">
              <div className="flex items-center gap-3">
                <div
                  className={`w-[8px] h-[8px] rounded-full ${(() => {
                    switch (status) {
                      case "Planned":
                        return "bg-orange-accent";
                      case "In-Progress":
                        return "bg-purple-light";
                      case "Live":
                        return "bg-cyan-accent";
                      default:
                        return ""; // Default case for any other status
                    }
                  })()}`}
                />
                <p className="text-b3 text-gray-text font-normal">
                  {item.status.charAt(0).toUpperCase() + item.status.slice(1)}
                </p>
              </div>

              {/* Title Description */}
              <Link
                href={`/feedback-detail/${item.id}`}
                className="whitespace-normal break-words flex flex-col gap-3"
              >
                <h3 className="font-bold text-b3 xs:tracking-[-0.18px] text-blue-dark">{item.title}</h3>
                <p className="text-b3 font-normal text-gray-text">{item.description}</p>
              </Link>

              {/* Category */}
              <div>
                <CategoryTag
                  tag={
                    item.category.charAt(0).toUpperCase() +
                    item.category.slice(1)
                  }
                  disabled={true}
                  preventActive={true}
                />
              </div>

              {/* Upvote and Comment */}
              <div className="flex justify-between items-center">
                <Upvote initialUpvotes={item.upvotes} feedbackId={item.id} />
                <Link
                  href={`/feedback-detail/${item.id}`}
                  className="flex items-center"
                >
                  <Comment commentCount={CommentCount[index]} />
                </Link>
              </div>
            </div>
          </div>
        </div>
      ))}
    </>
  );
};

export default RoadmapItemMobile;
