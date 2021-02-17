import React from "react";

const Article = (props) => {
  const author = [" ", "Software Lover", "Alan Turing", "Edsger Dijkstra"];
  console.log(props);
  return (
    <div className="Article">
      id:{props.id}
      author:{author[props.author]}
      title:{props.title}
      <button id="title-button" onClick={() => props.clickTitle(props.id)}>
        title:{props.title}
      </button>
    </div>
  );
};
export default Article;
