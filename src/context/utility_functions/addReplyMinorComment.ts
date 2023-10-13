import { IComments, IFeedback, IProductRequests, IReply } from "@/context/FeedbackInterface";

export function addReplyMinorComment(
  feedbackId: number,
  majorCommentId: number,
  replyToUser: string,
  newReplyMinorComment: string,
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


  // Create the new comment object
  const newReplyMinorCommentObject: IReply = {
        user: rawData.currentUser,
        replyingTo: replyToUser,
        content: newReplyMinorComment,
  };

  // Update the feedback with the new comment
  const updatedFeedback = allFeedback.map((feedback) => {
    if (feedback.id === feedbackId) {
     feedback.comments?.forEach((comment: IComments) => {
        if(comment.id === majorCommentId){
          // If the replies array is empty, create it
          if (!comment.replies) comment.replies = [];
          comment.replies?.push(newReplyMinorCommentObject);
        }
     })
    }
    return feedback;
  });

  // Update the state
  setAllFeedback(updatedFeedback);
}
