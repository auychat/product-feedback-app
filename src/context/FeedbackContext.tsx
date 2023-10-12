"use client";

import React, { useState, useMemo, createContext } from "react";
import { dummyData } from "@/pages/api/dummyData";
import { IAddNewFeedback, IEditFeedback, IFeedbackContextValue, IProductRequests } from "./FeedbackInterface";
import { addNewFeedback } from "./utility_functions/addNewFeedback";
import { updateUpvote } from "./utility_functions/updateUpvote";
import { addNewComment } from "./utility_functions/addNewComment";
import { editFeedback } from "./utility_functions/editFeedback";

// Create a new context for managing the feedback data
export const FeedbackContext = createContext<IFeedbackContextValue>({
  rawData: {currentUser: {image: "", name: "", username: ""}, productRequests: []},
  allFeedback: [],
  suggestProduct: [],
  nonSuggestProduct: [],
  sortingCriteria: "Most Upvotes",
  setSortingCriteria: () => {},
  sortSuggestProduct: [],
  addNewFeedback : () => {},
  editFeedback: () => {},
  addNewComment: () => {},
  updateUpvote: () => {},
});

// Create a provider for the feedback context
export const FeedbackProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const rawData = dummyData;
  const initailFeedback = dummyData.productRequests;
  const [allFeedback, setAllFeedback] = useState<IProductRequests[]>(initailFeedback );
  const productRequests = allFeedback;
  const [sortingCriteria, setSortingCriteria] =
    useState<string>("Most Upvotes");

  const suggestProduct: IProductRequests[] = productRequests.filter(
    (product) => product.status === "suggestion"
  );

  const nonSuggestProduct: IProductRequests[] = productRequests.filter(
    (product) => product.status !== "suggestion"
  );

  // Fucntion to Add new feedback
  const handleAddnewFeedback = (newFeedback: IAddNewFeedback) => {
    addNewFeedback(newFeedback, allFeedback, setAllFeedback);
  }

  // Function to Edit Feedback
  const handleEditFeedback = (editedFeedback: IEditFeedback) => {
    editFeedback(editedFeedback, allFeedback, setAllFeedback);
  }

  // Function to update upvote
  const handleUpdateUpvote = (feedbackId: number) => {
    updateUpvote(feedbackId, allFeedback, setAllFeedback);
  }

  // Function to add new comment
  const handleAddNewComment = (feedbackId:number, newComment: string) => {
    addNewComment(feedbackId, newComment,rawData, allFeedback, setAllFeedback);
  }

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
    rawData,
    allFeedback,
    suggestProduct,
    nonSuggestProduct,
    sortingCriteria,
    setSortingCriteria,
    sortSuggestProduct,
    addNewFeedback: handleAddnewFeedback,
    editFeedback: handleEditFeedback,
    addNewComment: handleAddNewComment,
    updateUpvote: handleUpdateUpvote,
  };

  return (
    <FeedbackContext.Provider value={contextValue}>
      {children}
    </FeedbackContext.Provider>
  );
};
