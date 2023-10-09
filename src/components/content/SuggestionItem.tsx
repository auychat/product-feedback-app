import React, {useContext} from "react";
import Upvote from "../custom/Upvote";
import CategoryTag from "../custom/CategoryTag";
import Comment from "../custom/Comment";
import { FeedbackContext } from "@/context/FeedbackContext";


const SuggestionItem = () => {
  const {sortSuggestProduct} = useContext(FeedbackContext);

  return (
    <>
      {sortSuggestProduct.map((product) => (
        <div
          key={product.id}
          className="w-full min-h-[151px] bg-white rounded-[10px] shadow-sm flex items-center"
        >
          <div className="py-7 px-8 flex gap-6 w-full justify-between">
            <div className="flex gap-10">
              {/* Upvote number */}
              <Upvote initialUpvotes={product.upvotes} />

              {/* Title description */}
              <div className="flex flex-col gap-3">
                <h2 className="text-hm text-blue-dark">{product.title}</h2>
                <p className="text-b1 text-gray-text font-normal">
                  {product.description}
                </p>
                <div>
                  <CategoryTag>{product.category}</CategoryTag>
                </div>
              </div>
            </div>

            {/* Comment */}
          <Comment commentCount={product.comments?.length} />
          </div>
        </div>
      ))}
    </>
  );
};

export default SuggestionItem;
