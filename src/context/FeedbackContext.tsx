"use client";

import React, { useState, useMemo, useEffect, createContext } from "react";
import { dummyData } from "@/pages/api/dummyData";
import {
  IAddNewFeedback,
  IEditFeedback,
  IFeedbackContextValue,
  IProductRequests,
} from "./FeedbackInterface";
import { addNewFeedback } from "./utility_functions/addNewFeedback";
import { updateUpvote } from "./utility_functions/updateUpvote";
import { addNewComment } from "./utility_functions/addNewComment";
import { editFeedback } from "./utility_functions/editFeedback";
import { addReplyMajorComment } from "./utility_functions/addReplyMajorComment";
import { addReplyMinorComment } from "./utility_functions/addReplyMinorComment";
import { sortProduct } from "./utility_functions/sortProduct";

// Create a new context for managing the feedback data
export const FeedbackContext = createContext<IFeedbackContextValue>({
  rawData: {
    currentUser: { image: "", name: "", username: "" },
    productRequests: [],
  },
  allFeedback: [],
  suggestProduct: [],
  nonSuggestProduct: [],
  sortingCriteria: "Most Upvotes",
  setSortingCriteria: () => {},
  sortByCategoryTag: ["All"],
  handleSelectTag: () => {},
  sortSuggestProduct: [],
  addNewFeedback: () => {},
  editFeedback: () => {},
  deleteFeedback: () => {},
  addNewComment: () => {},
  addReplyMajorComment: () => {},
  addReplyMinorComment: () => {},
  updateUpvote: () => {},
});

// Create a provider for the feedback context
export const FeedbackProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const rawData = dummyData;
  const initailFeedback = dummyData.productRequests;
  const [allFeedback, setAllFeedback] = useState<IProductRequests[]>(initailFeedback);
  const productRequests = allFeedback;
  const [suggestProduct, setSuggestProduct] = useState<IProductRequests[]>([]);
  const [nonSuggestProduct, setNonSuggestProduct] = useState<IProductRequests[]>([]);
  const [sortingCriteria, setSortingCriteria] = useState<string>("Most Upvotes");
  const [sortByCategoryTag, setSortByCategoryTag] = useState<string[]>(["All"]);

  useEffect(() => {
    const filteredSuggestProduct: IProductRequests[] = productRequests.filter(
      (product) => product.status.toLowerCase() === "suggestion"
    );

    const filteredNonSuggestProduct: IProductRequests[] = productRequests.filter(
      (product) => product.status.toLowerCase() !== "suggestion"
    );

    setSuggestProduct(filteredSuggestProduct);
    setNonSuggestProduct(filteredNonSuggestProduct);

  }, [allFeedback, productRequests]);


  // Fucntion to Add new feedback
  const handleAddnewFeedback = (newFeedback: IAddNewFeedback) => {
    addNewFeedback(newFeedback, allFeedback, setAllFeedback);
  };

  // Function to Edit Feedback
  const handleEditFeedback = (editedFeedback: IEditFeedback) => {
    editFeedback(editedFeedback, allFeedback, setAllFeedback);
  };

  // Function to Delete Feedback
  const deleteFeedback = (feedbackId: number) => {
    const newFeedback = allFeedback.filter(
      (feedback) => feedback.id !== feedbackId
    );
    setAllFeedback(newFeedback);
  };

  // Function to update upvote
  const handleUpdateUpvote = (feedbackId: number) => {
    updateUpvote(feedbackId, allFeedback, setAllFeedback);
  };

  // Function to add new comment
  const handleAddNewComment = (feedbackId: number, newComment: string) => {
    addNewComment(feedbackId, newComment, rawData, allFeedback, setAllFeedback);
  };

  // Function to add new reply major comment
  const handleAddReplyMajorComment = (
    feedbackId: number,
    replyToUser: string,
    newReplyMajorComment: string
  ) => {
    addReplyMajorComment(
      feedbackId,
      replyToUser,
      newReplyMajorComment,
      rawData,
      allFeedback,
      setAllFeedback
    );
  };

    // Function to add new reply minor comment
    const handleAddReplyMinorComment = (
      feedbackId: number,
      majorCommentId: number,
      replyToUser: string,
      newReplyMinorComment: string
    ) => {
      addReplyMinorComment(
        feedbackId,
        majorCommentId,
        replyToUser,
        newReplyMinorComment,
        rawData,
        allFeedback,
        setAllFeedback
      );
    };

  // Function to calculate the total comment count for a product (including replies)
  const toTalCommentCount = (product: IProductRequests): number => {
    let totalComment = product.comments?.length ?? 0;
    if (product.comments) {
      product.comments.forEach((comment) => {
        totalComment += comment.replies?.length ?? 0;
      });
    }
    return totalComment;
  };

  // Function to handle select tag
  const handleSelectTag = (tag: string) => {
    if (sortByCategoryTag.includes(tag)) {
      const newSelectedTag = sortByCategoryTag.filter((item) => item !== tag);
      setSortByCategoryTag(newSelectedTag);
    } else {
      setSortByCategoryTag([...sortByCategoryTag, tag]);
    }
  };

  // Function to sort suggestProduct based on criteria and category tag
  const sortSuggestProduct = useMemo(() => {
    return sortProduct(suggestProduct, sortingCriteria, sortByCategoryTag, toTalCommentCount);
  }, [sortingCriteria, suggestProduct, sortByCategoryTag]);

  const contextValue: IFeedbackContextValue = {
    rawData,
    allFeedback,
    suggestProduct,
    nonSuggestProduct,
    sortingCriteria,
    setSortingCriteria,
    sortByCategoryTag,
    handleSelectTag,
    sortSuggestProduct,
    addNewFeedback: handleAddnewFeedback,
    editFeedback: handleEditFeedback,
    deleteFeedback,
    addNewComment: handleAddNewComment,
    addReplyMajorComment: handleAddReplyMajorComment,
    addReplyMinorComment: handleAddReplyMinorComment,
    updateUpvote: handleUpdateUpvote,
  };

  return (
    <FeedbackContext.Provider value={contextValue}>
      {children}
    </FeedbackContext.Provider>
  );
};
