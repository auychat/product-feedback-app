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
          <div className="py-7 px-8 flex gap-6 w-full justify-between">
            <div className="flex gap-10">
              {/* Upvote number */}
              <Upvote initialUpvotes={product.upvotes} feedbackId={product.id} />

              {/* Title description */}
              <div className="flex flex-col gap-3">
                <Link href={`/feedback-detail/${product.id}`}>
                  <h2 className="text-hm text-blue-dark hover:text-blue-primary">
                    {product.title}
                  </h2>
                  <p className="text-b1 text-gray-text font-normal">
                    {product.description}
                  </p>
                </Link>
                <div>
                  <CategoryTag>{product.category}</CategoryTag>
                </div>
              </div>
            </div>

            {/* Comment */}
            {/* <Comment commentCount={product.comments?.length} /> */}
            <Link href={`/feedback-detail/${product.id}`} className="flex items-center">
              <Comment commentCount={CommentCount[index]} />
            </Link>
          </div>
        </div>
      ))}
    </>
  );
};

export default SuggestionItem;
