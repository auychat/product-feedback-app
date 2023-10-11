import { IProductRequests } from "@/context/FeedbackInterface";

export function updateUpvote(
  feedbackId: number,
  allFeedback: IProductRequests[],
  setAllFeedback: (feedback: IProductRequests[]) => void
) {
  const updatedFeedback = allFeedback.map((feedback) => {
    if (feedback.id === feedbackId) {
      return { ...feedback, upvotes: feedback.upvotes + 1 };
    }
    return feedback;
  });
  setAllFeedback(updatedFeedback);
}
