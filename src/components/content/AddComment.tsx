import React, { useState, useEffect, useRef } from "react";
import Button from "@/components/custom/Button";

interface IAddComment {
  onAddComment: (newCommentValue: string) => void;
}

const AddComment = ({onAddComment}: IAddComment) => {
  const [comment, selectedComment] = useState("");
  const textAreaRef = useRef<HTMLTextAreaElement>(null);
  const maxCharacterCount = 250;

  // Function to upate the comment state and character count
  const handleCommentChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const inputText = e.target.value;
    selectedComment(inputText);

    // Calculate the remaining character count
    const characterCount = inputText.length;
    const characterLeft = maxCharacterCount - characterCount;
    const remainingCharacter = Math.max(characterLeft, 0);
    const charCountElement = document.getElementById("charCount");

    // Update character count display
    if (charCountElement) {
      charCountElement.innerText = `${remainingCharacter} Character${
        remainingCharacter > 1 ? "s" : ""
      } left`;
    }
  };

  // Auto adjust height of textarea
  useEffect(() => {
    if (textAreaRef.current) {
      textAreaRef.current.style.height = "auto";
      textAreaRef.current.style.height =
        textAreaRef.current?.scrollHeight + "px";
    }
  }, [comment]);


  return (
    <div className="w-full min-h-[246px] bg-white rounded-[10px] shadow-sm flex flex-col gap-7 p-8">
      <h3 className="text-hm text-blue-dark">Add Comment</h3>
      <textarea
        id="comment"
        value={comment}
        onChange={handleCommentChange}
        maxLength={maxCharacterCount}
        placeholder="Type your comment here"
        className="bg-gray-background w-[664px] min-h-[80px] p-4 rounded-[5px] text-b2 font-normal text-blue-dark focus:border focus:border-blue-primary focus:ring-blue-primary overflow-hidden"
        ref={textAreaRef}
      />
      <div className="flex justify-between">
        <p
          id="charCount"
          className="text-b2 text-gray-text font-normal"
        >{`${maxCharacterCount} Characters left`}</p>
        <Button
          type="submit"
          btnColor="purple-light"
          onClick={() => onAddComment(comment)}
          disabled={comment.length===0}
        >
          Post Comment
        </Button>
      </div>
    </div>
  );
};

export default AddComment;
