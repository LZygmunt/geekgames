import React, { Component } from "react";

import "./comment.css"
import "./comments.css"

import logo from "../../images/logo-geek-games.png"

class Comment extends Component {
  render() {
    const { comment } = this.props;
    return (
      <div className="comment">
        <div className="comment-identification">
          <img
            src={ comment.authorAvatar === "" ? logo : comment.authorAvatar }
            alt={ comment.authorNick }
          />
          <p>{ comment.authorNick }</p>
        </div>
        <div className="comment-content">
          <p>{ comment.comment }</p>
        </div>
      </div>
    );
  }
}

export default Comment;
