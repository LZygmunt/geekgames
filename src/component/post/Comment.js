import React, { Component } from "react";

import "./comment.css"
import "./comments.css"

import logo from "../../images/logo-geek-games.png"

class Comment extends Component {

  //TODO wysyłanie formularzy enterem

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
        <div className="comment-created">
          <p>{ comment.created.toDate().toLocaleString() }</p>
        </div>
      </div>
    );
  }
}

export default Comment;
