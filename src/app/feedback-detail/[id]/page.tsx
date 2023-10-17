"use client";

import React, { useContext, useState } from "react";
import Button from "@/components/custom/Button";
import { useRouter, useParams } from "next/navigation";
import SuggestionItem from "@/components/content/SuggestionItem";
import { FeedbackContext } from "@/context/FeedbackContext";
import CommentDetail from "@/components/content/CommentDetail";
import AddComment from "@/components/content/AddComment";
import NotFound from "@/components/custom/NotFound";

const FeedbackDetail = () => {
  const router = useRouter();
  const params = useParams();

  const { allFeedback, addNewComment } = useContext(FeedbackContext);
  const [newCommentValue, setNewCommentValue] = useState("");

  const selectedItem = params?.id
    ? allFeedback.filter((product) => product.id === +params.id)
    : [];

  const seletedItemId = selectedItem[0]?.id;
  const selectedComment = selectedItem[0]?.comments;

  // Function to add new comment
  const handleAddComment = (newCommentValue: string) => {
    setNewCommentValue(newCommentValue);
    const feedbackId = selectedItem[0]?.id;
    addNewComment(feedbackId, newCommentValue);
  };

  // Function to handle Goback button
  const handleGoBack = () => {
    if (
      selectedItem[0].status === "planned" ||
      selectedItem[0].status === "in-progress" ||
      selectedItem[0].status === "live"
    ) {
      router.push("/roadmap");
    } else {
      router.push("/");
    }
  };

  if (selectedItem.length === 0) {
    return <NotFound />;
  }

  return (
    <div className="bg-gray-background md:px-8">
      <div className="max-w-[730px] min-h-[750px] mx-auto flex flex-col gap-6 pt-[94px] pb-[130px] xs:pb-[88px] xs:min-w-[375px] xs:max-w-[480px] xs:p-6 sm:pt-[56px] sm:pb-[110px] sm:px-[39px] md:pt-[56px] md:pb-[110px]">
        {/* Header */}
        <div className="h-[44px] w-full rounded-[10px] flex items-center justify-between xs:h-[40px]">
          <Button
            onClick={() => handleGoBack()}
            btnColor="goback-light"
            className="px-0 py-0 w-auto h-auto xs:w-[72px] xs:px-0 xs:py-0 xs:text-b3 xs:font-bold"
          >
            Go Back
          </Button>
          <Button
            onClick={() => router.push(`/edit-feedback/${params?.id}`)}
            btnColor="blue-primary"
            className="xs:w-[119px] xs:h-[40px] xs:text-b3 xs:font-bold xs:px-0 xs:py-0 sm:w-[142px] sm:h-[44px] sm:px-0 sm:py-0"
          >
            Edit Feedback
          </Button>
        </div>

        {/* Suggestion Items */}
        <SuggestionItem feedbackItems={selectedItem} />

        {/* Comment Details */}
        <CommentDetail feedbackItemsId={seletedItemId} commentItems={selectedComment} />

        {/* Add Comment */}
        <AddComment onAddComment={handleAddComment} />
      </div>
    </div>
  );
};

export default FeedbackDetail;
