import React from "react";
import { IComments, IReply } from "@/context/FeedbackInterface";
import Image from "next/image";

interface commentDetailProps {
  commentItems?: IComments[];
}

const CommentDetail = ({ commentItems }: commentDetailProps) => {
  const mainCommentCount = commentItems?.length?? 0;
  const replyCommentCount = commentItems?.map((c) => c.replies?.length?? 0);
  const totalCommentCount = mainCommentCount  + (replyCommentCount?.reduce((a, b) => a + b, 0)?? 0);

  return (
    <div className="w-full min-h-[150px] bg-white rounded-[10px] shadow-sm flex flex-col gap-8 p-8">
      <h3 className="text-hm text-blue-dark">
        {totalCommentCount} Comments
      </h3>

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
              className="text-b3 font-semibold text-blue-primary"
            >
              Reply
            </button>
          </div>
          <div className="w-full pl-[72px] relative">
            <p className="text-b2 text-gray-text font-normal">
              {comment.content}
            </p>

            {/* Reply Comment */}
            {Array.isArray(comment.replies) && comment.replies?.length > 0 && (
              <div className="absolute top-0 left-0 border-l border-gray-text border-opacity-10 translate-x-5 h-[calc(100%-100px)]" />
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
                  >
                    Reply
                  </button>
                </div>
                <div className="w-full pl-[72px] flex">
                  <p className="text-b2 text-gray-text font-normal">
                    <span className="text-b2 font-bold text-purple-light">
                      @{reply.replyingTo}{" "}
                    </span>
                    {reply.content}
                  </p>
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
