import React, {useContext} from "react";
import { useRouter } from "next/navigation";
import { FeedbackContext } from "@/context/FeedbackContext";
import Button from "./Button";
import { IProductRequests } from "@/context/FeedbackInterface";

interface DeleteModalProps {
    selectFeedback: IProductRequests;
    closeDeleteModal: () => void;
}


const DeleteModal = ({selectFeedback, closeDeleteModal} : DeleteModalProps) => {
    const router = useRouter();
    const { deleteFeedback,} = useContext(FeedbackContext);

    const feedbackTitle = selectFeedback?.title;

    const handleDeleteFeedback = async () => {
    try {
      await deleteFeedback(selectFeedback.id);
      closeDeleteModal();

      if (
        selectFeedback.status === "planned" ||
        selectFeedback.status === "in-progress" ||
        selectFeedback.status === "live"
      ) {
        router.push("/roadmap");
      } else {
        router.push("/");
      }
    } catch (error) {
      console.log(error);
    }
    }

  return (
    <div className="fixed inset-0 z-50 overflow-auto bg-black bg-opacity-50 flex justify-center items-center">
      <div className="bg-white w-[420px] min-h-[200px] p-8 rounded-lg flex flex-col gap-4 relative xs:w-[327px] xs:h-[284px] xs:p-6">
        <h2 className="text-hl font-bold text-red-500 xs:text-hm">Delete this feedback?</h2>
        <p className="text-b2 text-blue-dark font-medium xs:text-b3">
          Are you sure you want to delete the <span className="text-red-500">&apos;{feedbackTitle}&apos; </span>
          feedback? This action will remove all of this feedback data and cannot be
          reversed.
        </p>

        <div className="flex flex-row w-full justify-between gap-6 xs:flex-col xs:gap-4 xs:w-full">
          <Button
            btnColor="danger"
            onClick={() => {
                handleDeleteFeedback();
            }}
            className="xs:w-full"
          >
            Delete
          </Button>

          <Button
            btnColor="blue-dark"
            onClick={() => {
              closeDeleteModal()
            }}
            className="xs:w-full"
          >
            Cancel
          </Button>
        </div>
      </div>
    </div>
  );
};

export default DeleteModal;
