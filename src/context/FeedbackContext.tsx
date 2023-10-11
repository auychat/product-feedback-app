"use client";

import React, { useState, useMemo, createContext } from "react";
import { dummyData } from "@/pages/api/dummyData";
import { IFeedbackContextValue, IProductRequests } from "./FeedbackInterface";

// Create a new context for managing the feedback data
export const FeedbackContext = createContext<IFeedbackContextValue>({
  allFeedback: [],
  suggestProduct: [],
  nonSuggestProduct: [],
  sortingCriteria: "Most Upvotes",
  setSortingCriteria: () => {},
  sortSuggestProduct: [],
});

// Create a provider for the feedback context
export const FeedbackProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const allFeedback = dummyData.productRequests;
  const productRequests = dummyData.productRequests;
  const [sortingCriteria, setSortingCriteria] =
    useState<string>("Most Upvotes");

  const suggestProduct: IProductRequests[] = productRequests.filter(
    (product) => product.status === "suggestion"
  );

  const nonSuggestProduct: IProductRequests[] = productRequests.filter(
    (product) => product.status !== "suggestion"
  );

  // Function to calculate the total comment count for a product (including replies)
  const toTalCommentCount = (product: IProductRequests): number => {
    let  totalComment = product.comments?.length ?? 0;
    if (product.comments) {
      product.comments.forEach((comment) => {
        totalComment += comment.replies?.length ?? 0;
      })
    }
    return totalComment;
  };

  // Function to sort suggestProduct based on criteria
  const sortSuggestProduct = useMemo(() => {
    let sortedProductRequest = [...suggestProduct];

    if (sortingCriteria === "Most Upvotes") {
      sortedProductRequest.sort((a, b) => b.upvotes - a.upvotes);
    } else if (sortingCriteria === "Least Upvotes") {
      sortedProductRequest.sort((a, b) => a.upvotes - b.upvotes);
    } else if (sortingCriteria === "Most Comments") {
      sortedProductRequest.sort(
        (a,b) => toTalCommentCount(b) - toTalCommentCount(a)
      );
    } else if (sortingCriteria === "Least Comments") {
      sortedProductRequest.sort(
        (a,b) => toTalCommentCount(a) - toTalCommentCount(b)
      );
    }
    return sortedProductRequest;
  }, [sortingCriteria, suggestProduct]);

  const contextValue: IFeedbackContextValue = {
    allFeedback,
    suggestProduct,
    nonSuggestProduct,
    sortingCriteria,
    setSortingCriteria,
    sortSuggestProduct,
  };

  return (
    <FeedbackContext.Provider value={contextValue}>
      {children}
    </FeedbackContext.Provider>
  );
};
