import React, { useContext } from "react";
import Upvote from "../custom/Upvote";
import CategoryTag from "../custom/CategoryTag";
import Comment from "../custom/Comment";
import { IProductRequests } from "@/context/FeedbackInterface";
import Link from "next/link";

interface SuggestionItemProps {
  feedbackItems: IProductRequests[];
}

const SuggestionItem = ({ feedbackItems }: SuggestionItemProps) => {
  const CommentCount = feedbackItems?.map((product) => {
    let totalComment = product.comments?.length ?? 0;
    if (product.comments) {
      product.comments.forEach((comment) => {
        totalComment += comment.replies?.length ?? 0;
      });
    }
    return totalComment;
  });

  return (
    <>
      {feedbackItems.map((product, index) => (
        <div
          key={product.id}
          className="w-full min-h-[151px] bg-white rounded-[10px] shadow-sm flex items-center"
        >
          <div className="py-7 px-8 flex gap-6 w-full justify-between xs:px-6 xs:py-6 xs:flex-col xs:gap-4">
            <div className="flex gap-10 xs:flex-col">
              {/* Upvote number */}
              <div className="xs:hidden">
                <Upvote
                  initialUpvotes={product.upvotes}
                  feedbackId={product.id}
                />
              </div>

              {/* Title description */}
              <div className="flex flex-col gap-3 max-w-[510px] whitespace-normal break-words xs:gap-2">
                <Link href={`/feedback-detail/${product.id}`} className="flex flex-col gap-3">
                  <h2 className="text-hm text-blue-dark hover:text-blue-primary xs:text-hs xs:font-bold xs:tracking-[-0.18px]">
                    {product.title}
                  </h2>
                  <p className="text-b1 text-gray-text font-normal xs:text-b3 ">
                    {product.description}
                  </p>
                </Link>
                <div>
                  <CategoryTag
                    tag={
                      product.category.charAt(0).toUpperCase() +
                      product.category.slice(1)
                    }
                    disabled={true}
                    preventActive={true}
                  />
                </div>
              </div>
            </div>

            {/* Comment */}
            <div className="flex items-center justify-between">
              {/* Upvote number */}
              <div className="xs:block sm:hidden md:hidden lg:hidden xl:hidden">
                <Upvote
                  initialUpvotes={product.upvotes}
                  feedbackId={product.id}
                />
              </div>
              <Link
                href={`/feedback-detail/${product.id}`}
                className="flex items-center mb-4 xs:mb-0"
              >
                <Comment commentCount={CommentCount[index]} />
              </Link>
            </div>
          </div>
        </div>
      ))}
    </>
  );
};

export default SuggestionItem;
