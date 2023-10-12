import { IAddNewFeedback, IProductRequests } from "@/context/FeedbackInterface";

export const addNewFeedback = (
  newFeedback: IAddNewFeedback,
  allFeedback: IProductRequests[],
  setAllFeedback: (feedback: IProductRequests[]) => void,
) => {
  // Generate new id for the new feedback
  const newId = Math.max(...allFeedback.map((feedback) => feedback.id)) + 1;

  // Create the new feedback object
  const newFeedbackObject = {
    id: newId,
    title: newFeedback.title,
    category: newFeedback.category,
    upvotes: 0,
    status: "suggestion",
    description: newFeedback.description,
    comments: [],
  };

  // Update the state with the new feedback
  const updateFeedback = [...allFeedback, newFeedbackObject];
  setAllFeedback(updateFeedback);
};
