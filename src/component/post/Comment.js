import React from "react";

import "./comment.css"
import "./comments.css"

import logo from "../../images/logo-geek-games.png"

const Comment = ({ comment }) => {
  return (
    <div className="comment">
      <div className="comment-identification">
        <img
          src={ comment.authorAvatar === "" ? logo : comment.authorAvatar }
          alt={ comment.authorNick }
        />
        <p>{ comment.authorNick }</p>
          <div className="comment-created">
              <p>{ comment.created.toDate().toLocaleString() }</p>
          </div>
      </div>
      <div className="comment-content">
        <p>{ comment.comment }</p>
      </div>

    </div>
  );
}

export default Comment;
