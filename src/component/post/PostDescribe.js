import React from "react";
import "./post.css"

const PostDescribe = ({ post }) => {
  return (
    <div>
      <h2>{ post.title }</h2>
      <p>{ post.created.toDate().toLocaleDateString() } { post.created.toDate().getHours() }:{ post.created.toDate().getMinutes() }</p>
      <p style={{ textAlign: "justify" }}>{ post.desc.length > 200 ? post.desc.slice(0, 200) + "...": post.desc}</p>
    </div>
  );
};

export default PostDescribe;
