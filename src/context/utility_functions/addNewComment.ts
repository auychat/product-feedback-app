import {
  IAddNewFeedback,
  IFeedback,
  IProductRequests,
} from "@/context/FeedbackInterface";

export function addNewComment(
  feedbackId: number,
  newComment: string,
  rawData: IFeedback,
  allFeedback: IProductRequests[],
  setAllFeedback: (feedback: IProductRequests[]) => void
) {
  // Find the feedback that needs to be updated
  const feedbackToUpdate = allFeedback.find(
    (feedback) => feedback.id === feedbackId
  );

  // If the feedback is not found, return
  if (!feedbackToUpdate) return;

  // Calculate the new comment ID
  let newCommentId = 1;
  if (feedbackToUpdate?.comments && feedbackToUpdate?.comments.length > 0) {
    newCommentId =
      Math.max(...feedbackToUpdate.comments.map((comment) => comment.id)) + 1;
  }

  // Create the new comment object
  const newCommentObject = {
    id: newCommentId,
    content: newComment,
    user: rawData.currentUser,
    reply: [],
  };

  // Update the feedback with the new comment
  const updatedFeedback = allFeedback.map((feedback) => {
    if (feedback.id === feedbackId) {
      return {
        ...feedback,
        comments: feedbackToUpdate?.comments
          ? [...feedbackToUpdate.comments, newCommentObject]
          : [newCommentObject],
      };
    }
    return feedback;
  });

  // Update the state
  setAllFeedback(updatedFeedback);
}
