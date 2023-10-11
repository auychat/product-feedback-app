"use client";

import React, { useContext, useState } from "react";
import Button from "@/components/custom/Button";
import { useRouter, useParams } from "next/navigation";
import SuggestionItem from "@/components/content/SuggestionItem";
import { FeedbackContext } from "@/context/FeedbackContext";
import CommentDetail from "@/components/content/CommentDetail";
import AddComment from "@/components/content/AddComment";
import { IAddNewComment } from "@/context/FeedbackInterface";

const FeedbackDetail = () => {
  const router = useRouter();
  const params = useParams();

  const { suggestProduct, addNewComment } = useContext(FeedbackContext);
  const [newCommentValue, setNewCommentValue] = useState("");

  const selectedItem = params?.id
    ? suggestProduct.filter((product) => product.id === +params.id)
    : [];

  const selectedComment = selectedItem[0]?.comments;


  // Function to add new comment
  const handleAddComment = (newCommentValue: string) => {
    setNewCommentValue(newCommentValue);
    const feedbackId = selectedItem[0]?.id;
    addNewComment(feedbackId, newCommentValue);
  };

  return (
    <div className="bg-gray-background">
      <div className="max-w-[730px] min-h-[750px] mx-auto flex flex-col gap-6 pt-[94px] pb-[130px]">
        {/* Header */}
        <div className="h-[44px] w-full rounded-[10px] flex items-center justify-between">
          <Button
            onClick={() => router.back()}
            btnColor="goback-light"
            className="px-0 py-0 w-auto h-auto"
          >
            Go Back
          </Button>
          <Button
            onClick={() => router.push("/edit-feedback")}
            btnColor="blue-primary"
          >
            Edit Feedback
          </Button>
        </div>

        {/* Suggestion Items */}
        <SuggestionItem feedbackItems={selectedItem} />

        {/* Comment Details */}
        <CommentDetail commentItems={selectedComment} />

        {/* Add Comment */}

        <AddComment onAddComment={handleAddComment} />
      </div>
    </div>
  );
};

export default FeedbackDetail;
