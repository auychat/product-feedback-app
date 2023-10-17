import React, { useState, useEffect, useRef, useContext, use } from "react";
import { IComments, IUser } from "@/context/FeedbackInterface";
import Image from "next/image";
import Button from "../custom/Button";
import { FeedbackContext } from "@/context/FeedbackContext";
import { useMediaQuery } from "react-responsive";

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
  const [isMobile, setIsMobile] = useState(false);

  const isMobileView = useMediaQuery({ query: "(max-width: 480px)" });

  const { addReplyMajorComment, addReplyMinorComment } =
    useContext(FeedbackContext);

  const lastReplyCommentImageRef = useRef<HTMLImageElement>(null);
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

  useEffect(() => {
    setIsMobile(isMobileView);
  }, [isMobileView]);

  return (
    <div className="w-full min-h-[150px] bg-white rounded-[10px] shadow-sm flex flex-col gap-8 p-8 xs:gap-6 xs:p-6 sm:gap-6 sm:p-6">
      <h3 className="text-hm text-blue-dark">
        {totalCommentCount !== undefined
          ? totalCommentCount === 1
            ? `${totalCommentCount} Comment`
            : `${totalCommentCount} Comments`
          : "0 Comments"}
      </h3>

      {commentItems?.map((comment, index) => (
        <div key={comment.id} className="flex flex-col gap-4 ">
          <div className="flex items-center justify-between">
            <div className="flex gap-8 xs:gap-4 ">
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
          <div className="w-full pl-[72px] relative xs:pl-0 ">
            <div className="relative">
              <p className="text-b2 text-gray-text font-normal xs:text-b3 ">
                {comment.content}
              </p>

              {/* For Vertical Line of Comment */}
              {!isMobile &&
                Array.isArray(comment.replies) &&
                comment.replies?.length > 0 && (
                  <div className="absolute top-0 left-[-51px] h-full border-l border-gray-text border-opacity-10" />
                )}
            </div>

            {/* Add new Reply Major Comment */}
            {majorReplyToCommentId === comment.id && isReplyMajorOpen && (
              <div className="flex items-center justify-between gap-4 pt-6 lg:max-w-[594px]">
                <div className="flex flex-col w-full gap-4">
                  <textarea
                    id="reply-major-comment"
                    value={replyMajorComment}
                    onChange={handleCommentChange}
                    maxLength={maxCharacterCount}
                    className="bg-gray-background w-[461px] min-h-[80px] p-4 rounded-[5px] text-b2 font-normal text-blue-dark focus:border focus:border-blue-primary focus:ring-blue-primary overflow-hidden xs:min-w-[279px] xs:w-full xs:text-b3 sm:w-full md:w-full lg:w-full xl:w-full"
                    ref={textAreaRef}
                  />

                  <div className="flex items-center justify-between">
                    <p
                      id="charCount"
                      className="text-b2 text-gray-text font-normal xs:text-b3"
                    >{`${remainingMajorCharacter} Character${
                      remainingMajorCharacter > 1 ? "s" : ""
                    } left`}</p>

                    <div className="xs:block sm:block md:block lg:hidden xl:hidden">
                      <Button
                        className="xs:w-[119px] xs:h-[40px] xs:text-b3 xs:font-bold xs:px-0 xs:py-0 sm:w-[142px] sm:h-[44px] sm:px-0 sm:py-0"
                        btnColor="purple-light"
                        onClick={() => handleAddMajorComment(comment.user)}
                      >
                        Post Reply
                      </Button>
                    </div>
                  </div>
                </div>

                <div className="xs:hidden sm:hidden md:hidden">
                  <Button
                    className="w-[117px] mb-6"
                    btnColor="purple-light"
                    onClick={() => handleAddMajorComment(comment.user)}
                  >
                    Post Reply
                  </Button>
                </div>
              </div>
            )}
            {/* End of Reply Major Comment */}

            <div
              className="translate-x-[-28px] xs:translate-x-[23px] xs:min-w-[256px] xs:w-full xs:pr-6 w-[calc(100%+28px)] relative"
              ref={lastReplyCommentImageRef}
            >
              {comment.replies?.map((reply, index) => (
                <div
                  key={index}
                  className="flex flex-col gap-4 w-full pt-8 relative"
                >
                  {/* For Vertical Line of Reply Comment */}
                  {comment.replies && index !== comment.replies?.length - 1 && (
                    <div className="absolute top-0 left-[-23px] h-[calc(100%)] border-l border-gray-text border-opacity-10" />
                  )}
                  <div className="flex items-center justify-between">
                    <div className="flex gap-8 xs:gap-4">
                      <div className="relative w-10 h-10 rounded-full">
                        {/* For Vertical Line of Reply Comment */}
                        {comment.replies &&
                          index === comment.replies.length - 1 && (
                            <div className="absolute top-[-32px] left-[-23px] h-[52px] border-l border-gray-text border-opacity-10" />
                          )}
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
                  <div className="w-full pl-[72px] flex flex-col xs:pl-0">
                    <p className="text-b2 text-gray-text font-normal xs:text-b3">
                      <span className="text-b2 font-bold text-purple-light xs:text-b3">
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
                          <div className="flex flex-col w-full gap-4">
                            <textarea
                              id="reply-minor-comment"
                              value={replyMinorComment}
                              onChange={handleCommentChange}
                              maxLength={maxCharacterCount}
                              className="bg-gray-background w-[416px] min-h-[80px] p-4 rounded-[5px] text-b2 font-normal text-blue-dark focus:border focus:border-blue-primary focus:ring-blue-primary overflow-hidden xs:min-w-[256px] xs:w-full xs:text-b3 sm:w-full md:w-full lg:w-full xl:w-full"
                              ref={textAreaRef}
                            />

                            <div className="flex items-center justify-between">
                              <p
                                id="minorCharCount"
                                className="text-b2 text-gray-text font-normal xs:text-b3 "
                              >{`${remainingMinorCharacter} Character${
                                remainingMinorCharacter > 1 ? "s" : ""
                              } left`}</p>

                              <div className="xs:block sm:block md:block lg:hidden xl:hidden">
                                <Button
                                  className="xs:w-[119px] xs:h-[40px] xs:text-b3 xs:font-bold xs:px-0 xs:py-0 sm:w-[142px] sm:h-[44px] sm:px-0 sm:py-0"
                                  btnColor="purple-light"
                                  onClick={handleAddMinorComment}
                                >
                                  Post Reply
                                </Button>
                              </div>
                            </div>
                          </div>

                          <div className="xs:hidden sm:hidden md:hidden lg:block xl:block">
                            <Button
                              className="w-[117px] mb-6 "
                              btnColor="purple-light"
                              onClick={handleAddMinorComment}
                            >
                              Post Reply
                            </Button>
                          </div>
                        </div>
                      )}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Conditionally render the horizontal line, except for the last comment */}
          {index !== commentItems.length - 1 && (
            <hr className="w-auto border-1 bg-[#8C92B3] bg-opacity-25 mt-4 xs:w-[280px]" />
          )}
        </div>
      ))}
    </div>
  );
};

export default CommentDetail;
