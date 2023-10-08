import React from "react";
import { dummyData } from "@/app/pages/api/dummyData";
import Upvote from "../custom/Upvote";
import CategoryTag from "../custom/CategoryTag";

const SuggestionItem = () => {
  const productRequests = dummyData.productRequests;
  const suggestProduct = productRequests.filter(
    (product) => product.status === "suggestion"
  );

  return (
    <>
      {suggestProduct.map((product) => (
        <div
          key={product.id}
          className="w-full min-h-[151px] bg-white rounded-[10px] shadow-sm flex items-center"
        >
          <div className="py-7 px-8 flex gap-6 w-full justify-between">
            <div className="flex gap-10">
              <Upvote initialUpvotes={product.upvotes} />
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
            <div className="flex gap-2 items-center">
              {/* Icon Comment */}
              <svg width="18" height="16" xmlns="http://www.w3.org/2000/svg">
                <path
                  d="M2.62 16H1.346l.902-.91c.486-.491.79-1.13.872-1.823C1.036 11.887 0 9.89 0 7.794 0 3.928 3.52 0 9.03 0 14.87 0 18 3.615 18 7.455c0 3.866-3.164 7.478-8.97 7.478-1.017 0-2.078-.137-3.025-.388A4.705 4.705 0 012.62 16z"
                  fill="#CDD2EE"
                  fillRule="nonzero"
                />
              </svg>

              <p
                className={`text-b1 text-blue-dark font-bold ${
                  product.comments?.length === 0 ||
                  product.comments === undefined
                    ? "text-opacity-50"
                    : "text-opacity-100"
                }`}
              >
                {product.comments?.length === 0 ||
                product.comments === undefined
                  ? "0"
                  : product.comments?.length}
              </p>
            </div>
          </div>
        </div>
      ))}
    </>
  );
};

export default SuggestionItem;
