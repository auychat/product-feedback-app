"use client";

import React, { useState, useMemo, createContext } from "react";
import { dummyData } from "@/pages/api/dummyData";
import { IFeedbackContextValue, IProductRequests } from "./FeedbackInterface";

// Create a new context for managing the feedback data
export const FeedbackContext = createContext<IFeedbackContextValue>({
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
  const productRequests = dummyData.productRequests;
  const [sortingCriteria, setSortingCriteria] =
    useState<string>("Most Upvotes");

  const suggestProduct: IProductRequests[] = productRequests.filter(
    (product) => product.status === "suggestion"
  );

  const nonSuggestProduct: IProductRequests[] = productRequests.filter(
    (product) => product.status !== "suggestion"
  );

  // Function to sort suggestProduct based on criteria
  const sortSuggestProduct = useMemo(() => {
    let sortedProductRequest = [...suggestProduct];

    if (sortingCriteria === "Most Upvotes") {
      sortedProductRequest.sort((a, b) => b.upvotes - a.upvotes);
    } else if (sortingCriteria === "Least Upvotes") {
      sortedProductRequest.sort((a, b) => a.upvotes - b.upvotes);
    } else if (sortingCriteria === "Most Comments") {
      sortedProductRequest.sort(
        (a, b) => (b.comments?.length || 0) - (a.comments?.length || 0)
      );
    } else if (sortingCriteria === "Least Comments") {
      sortedProductRequest.sort(
        (a, b) => (a.comments?.length || 0) - (b.comments?.length || 0)
      );
    }
    return sortedProductRequest;
  }, [sortingCriteria, suggestProduct]);

  const contextValue: IFeedbackContextValue = {
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
