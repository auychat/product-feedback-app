import React, { useState, useEffect, useRef, useContext } from "react";
import { IComments, IUser } from "@/context/FeedbackInterface";
import Image from "next/image";
import Button from "../custom/Button";
import { FeedbackContext } from "@/context/FeedbackContext";

interface commentDetailProps {
  commentItems?: IComments[];
  feedbackItemsId?: number;
}

const CommentDetail = ({
  commentItems,
  feedbackItemsId,
}: commentDetailProps) => {
  const [isReplyMajorOpen, setIsReplyMajorOpen] = useState(false);
  const [isReplyMinorOpen, setIsReplyMinorOpen] = useState(false);
  const [replyMajorComment, setReplyMajorComment] = useState("");
  const [replyMinorComment, setReplyMinorComment] = useState("");
  const [majorReplyToCommentId, setMajorReplyToCommentId] = useState<
    number | null
  >(null);
  const [minorReplyToCommentId, setMinorReplyToCommentId] = useState<
    number | null
  >(null);
  const [minorReplyToUser, setMinorReplyToUser] = useState<string>("");

  const { addReplyMajorComment, addReplyMinorComment } =
    useContext(FeedbackContext);

  const textAreaRef = useRef<HTMLTextAreaElement>(null);
  const maxCharacterCount = 250;

  const totalCommentCount = commentItems?.reduce(
    (total, comment) => total + (comment.replies?.length || 0) + 1,
    0
  );

  // Function to handle reply Major comment open and close
  const handleReplyMajorCommentOpen = (commentId: number) => {
    setMajorReplyToCommentId(commentId);
    setIsReplyMajorOpen(!isReplyMajorOpen);
  };

  // Function to handle reply minor comment open and close
  const handleReplyMinorCommentOpen = (user: IUser, commentId: number) => {
    setMinorReplyToCommentId(commentId);
    setMinorReplyToUser(user.username);
    setIsReplyMinorOpen(!isReplyMinorOpen);
  };

  // Function to upate the comment state and character count
  const handleCommentChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    if (e.target.id === "reply-major-comment") {
      setReplyMajorComment(e.target.value);
    }

    if (e.target.id === "reply-minor-comment") {
      setReplyMinorComment(e.target.value);
    }
  };

  // Auto adjust height of textarea
  useEffect(() => {
    if (textAreaRef.current) {
      textAreaRef.current.style.height = "auto";
      textAreaRef.current.style.height =
        textAreaRef.current?.scrollHeight + "px";
    }
  }, [replyMajorComment, replyMinorComment]);

  // Function to handle submit Major comment
  const handleAddMajorComment = (user: IUser) => {
    if (replyMajorComment.length > 0) {
      addReplyMajorComment(feedbackItemsId!, user.username, replyMajorComment);
      setReplyMajorComment("");
      setIsReplyMajorOpen(false);
    }
  };

  // Function to handle submit Minor comment
  const handleAddMinorComment = () => {
    if (replyMinorComment.length > 0) {
      addReplyMinorComment(
        feedbackItemsId!,
        minorReplyToCommentId!,
        minorReplyToUser,
        replyMinorComment
      );
      setReplyMinorComment("");
      setIsReplyMinorOpen(false);
    }
  };

  const remainingMajorCharacter = maxCharacterCount - replyMajorComment.length;
  const remainingMinorCharacter = maxCharacterCount - replyMinorComment.length;

  return (
    <div className="w-full min-h-[150px] bg-white rounded-[10px] shadow-sm flex flex-col gap-8 p-8">
      <h3 className="text-hm text-blue-dark">{totalCommentCount} Comments</h3>

      {commentItems?.map((comment, index) => (
        <div key={comment.id} className="flex flex-col gap-4 ">
          <div className="flex items-center justify-between">
            <div className="flex gap-8">
              <div className="relative w-10 h-10 rounded-full">
                <Image
                  src={comment.user.image}
                  alt={comment.user.name}
                  fill={true}
                  sizes="100%"
                  className="w-auto h-auto rounded-full"
                />
              </div>
              <div>
                <h5 className="text-hs text-blue-dark">{comment.user.name}</h5>
                <h5 className="text-hs text-gray-text font-normal">
                  {comment.user.username}
                </h5>
              </div>
            </div>
            <button
              type="button"
              onClick={() => handleReplyMajorCommentOpen(comment.id)}
              className="text-b3 font-semibold text-blue-primary"
            >
              Reply
            </button>
          </div>
          <div className="w-full pl-[72px] relative">
            <p className="text-b2 text-gray-text font-normal">
              {comment.content}
            </p>

            {/* Add new Reply Major Comment */}
            {majorReplyToCommentId === comment.id && isReplyMajorOpen && (
              <div className="flex items-center justify-between gap-4 pt-6">
                <div>
                  <textarea
                    id="reply-major-comment"
                    value={replyMajorComment}
                    onChange={handleCommentChange}
                    maxLength={maxCharacterCount}
                    className="bg-gray-background w-[461px] min-h-[80px] p-4 rounded-[5px] text-b2 font-normal text-blue-dark focus:border focus:border-blue-primary focus:ring-blue-primary overflow-hidden"
                    ref={textAreaRef}
                  />
                  <p
                    id="charCount"
                    className="text-b2 text-gray-text font-normal"
                  >{`${remainingMajorCharacter} Character${
                    remainingMajorCharacter > 1 ? "s" : ""
                  } left`}</p>
                </div>

                <Button
                  className="w-[117px] mb-6"
                  btnColor="purple-light"
                  onClick={() => handleAddMajorComment(comment.user)}
                >
                  Post Reply
                </Button>
              </div>
            )}
            {/* End of Reply Major Comment */}

            {/*Start Reply Minor Comment */}
            {Array.isArray(comment.replies) && comment.replies?.length > 0 && (
              <div className="absolute top-0 left-0 border-l border-gray-text border-opacity-10 translate-x-5 h-[calc(100%-60px)]" />
            )}
            <div className="translate-x-[-28px] w-[621px]">
              {comment.replies?.map((reply, index) => (
                <div key={index} className="flex flex-col gap-4 w-full pt-8">
                  <div className="flex items-center justify-between">
                    <div className="flex gap-8">
                      <div className="relative w-10 h-10 rounded-full">
                        <Image
                          src={reply.user.image}
                          alt={reply.user.name}
                          fill={true}
                          sizes="100%"
                          className="w-auto h-auto rounded-full"
                        />
                      </div>
                      <div>
                        <h5 className="text-hs text-blue-dark">
                          {reply.user.name}
                        </h5>
                        <h5 className="text-hs text-gray-text font-normal">
                          {reply.user.username}
                        </h5>
                      </div>
                    </div>
                    <button
                      type="button"
                      className="text-b3 font-semibold text-blue-primary"
                      onClick={() =>
                        handleReplyMinorCommentOpen(reply.user, comment.id)
                      }
                    >
                      Reply
                    </button>
                  </div>
                  <div className="w-full pl-[72px] flex flex-col">
                    <p className="text-b2 text-gray-text font-normal">
                      <span className="text-b2 font-bold text-purple-light">
                        @{reply.replyingTo}{" "}
                      </span>
                      {reply.content}
                    </p>
                    {/* Add new Reply Minor Comment */}
                    {minorReplyToCommentId === comment.id &&
                      isReplyMinorOpen &&
                      comment.replies &&
                      index === comment.replies?.length - 1 && (
                        <div className="flex items-center justify-between gap-4 pt-6">
                          <div>
                            <textarea
                              id="reply-minor-comment"
                              value={replyMinorComment}
                              onChange={handleCommentChange}
                              maxLength={maxCharacterCount}
                              className="bg-gray-background w-[416px] min-h-[80px] p-4 rounded-[5px] text-b2 font-normal text-blue-dark focus:border focus:border-blue-primary focus:ring-blue-primary overflow-hidden"
                              ref={textAreaRef}
                            />
                            <p
                              id="minorCharCount"
                              className="text-b2 text-gray-text font-normal"
                            >{`${remainingMinorCharacter} Character${
                              remainingMinorCharacter > 1 ? "s" : ""
                            } left`}</p>
                          </div>
                          <Button
                            className="w-[117px] mb-6"
                            btnColor="purple-light"
                            onClick={handleAddMinorComment}
                          >
                            Post Reply
                          </Button>
                        </div>
                      )}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Conditionally render the horizontal line, except for the last comment */}
          {index !== commentItems.length - 1 && (
            <hr className="w-[666px] border-1 bg-[#8C92B3] bg-opacity-25 mt-4" />
          )}
        </div>
      ))}
    </div>
  );
};

export default CommentDetail;
