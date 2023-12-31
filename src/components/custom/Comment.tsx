import React from "react";

interface CommentProps {
    commentCount: number | undefined;
}

const Comment = ({commentCount}: CommentProps) => {
  return (
    <div className="flex gap-2 items-center">
      {/* Icon Comment */}
      <svg width="18" height="16" xmlns="http://www.w3.org/2000/svg">
        <path
          d="M2.62 16H1.346l.902-.91c.486-.491.79-1.13.872-1.823C1.036 11.887 0 9.89 0 7.794 0 3.928 3.52 0 9.03 0 14.87 0 18 3.615 18 7.455c0 3.866-3.164 7.478-8.97 7.478-1.017 0-2.078-.137-3.025-.388A4.705 4.705 0 012.62 16z"
          fill="#CDD2EE"
          fillRule="nonzero"
        />
      </svg>
      {/* Comment Count Number */}
      <p
        className={`text-b1 text-blue-dark font-bold xs:text-b3 sm:text-b3 ${
          commentCount === 0 || commentCount === undefined
            ? "text-opacity-50"
            : "text-opacity-100"
        }`}
      >
        {commentCount === 0 || commentCount === undefined
          ? "0"
          : commentCount}
      </p>
    </div>
  );
};

export default Comment;
