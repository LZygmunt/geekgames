import React from "react";
import "./post.css"

const PostComponent = ({ post }) => {
  return (
    <div>
      <h2>{ post.postSubject }</h2>
      <p>{ post.createDate }</p>
      <p style={{ textAlign: "justify" }}>{ post.postDesc }</p>
    </div>
  );
};

export default PostComponent;
