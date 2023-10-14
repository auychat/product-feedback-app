import Link from "next/link";
import React from "react";
import CategoryTag from "../custom/CategoryTag";
import Upvote from "../custom/Upvote";
import Comment from "../custom/Comment";
import { IProductRequests } from "@/context/FeedbackInterface";

interface RoadmapItemProps {
  roadmapItems: IProductRequests[];
  status: string;
}

const RoadmapItem = ({ roadmapItems, status }: RoadmapItemProps) => {
  const CommentCount = roadmapItems?.map((product) => {
    let totalComment = product.comments?.length ?? 0;
    if (product.comments) {
      product.comments.forEach((comment) => {
        totalComment += comment.replies?.length ?? 0;
      });
    }
    return totalComment;
  });

  return (
    <div className="min-w-[350px] flex flex-col gap-6">
      <div className="mb-2">
        <h3 className="text-hm text-blue-dark">
          {status} ({roadmapItems.length})
        </h3>
        <p className="text-b1 text-gray-text">
          {status === "Planned"
            ? "Ideas prioritized for research"
            : status === "In-Progress"
            ? "Currently being developed"
            : "Released features"}
        </p>
      </div>
      {roadmapItems.map((item, index) => (
        <div
          key={item.id}
          className="bg-white min-h-[272px] rounded-[10px] shadow-sm"
        >
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
          <div className="p-8 flex flex-col gap-4">
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
              <p className="text-b1 text-gray-text font-normal">
                {item.status.charAt(0).toUpperCase() + item.status.slice(1)}
              </p>
            </div>

            {/* Title Description */}
            <Link href={`/feedback-detail/${item.id}`}>
              <h3 className="text-hm text-blue-dark">{item.title}</h3>
              <p className="text-b1 text-gray-text">{item.description}</p>
            </Link>

            {/* Category */}
            <div>
              <CategoryTag
                tag={
                  item.category.charAt(0).toUpperCase() + item.category.slice(1)
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
      ))}
    </div>
  );
};

export default RoadmapItem;
