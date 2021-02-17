import React from "react";

const Comment = (props) => {
  const author = [" ", "Software Lover", "Alan Turing", "Edsger Dijkstra"];
  return (
    <div className="Article">
      author:{author[props.author]}
      comment:{props.content}
      <button
        id="delete-comment-button"
        onClick={() => {
          props.clickDeleteComment(props.com_id);
        }}
      >
        delete comment
      </button>
      <button
        id="edit-comment-button"
        onClick={() => {
          props.clickEditComment(props);
        }}
      >
        edit comment
      </button>
    </div>
  );
};
export default Comment;
