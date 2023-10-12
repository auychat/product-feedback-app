import { IEditFeedback, IProductRequests } from "@/context/FeedbackInterface";

export const editFeedback = (
    editedFeedback: IEditFeedback,
    allFeedback: IProductRequests[],
    setAllFeedback: (feedback: IProductRequests[]) => void,) => {

        const id = editedFeedback.id;

        const updatedFeedback = allFeedback.map((feedback) => {
            if (feedback.id === id) {
                return {
                    ...feedback,
                    title: editedFeedback.title,
                    category: editedFeedback.category,
                    status: editedFeedback.status,
                    description: editedFeedback.description,
                };
            }
            return feedback;
        });
    setAllFeedback(updatedFeedback);
}