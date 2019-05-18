import React, { Component } from "react";
import "./comment.css"
import "./comments.css"

class Comment extends Component{
    render(){
        const { item } = this.props;
        return(
            <div className="comment">
                <div className="comment-identification">
                    <img
                        src={ item.imgUrl }
                        alt={ item.userName }
                    />
                    <p>{ item.userName }</p>
                </div>
                <div className="comment-content">
                    <p>{ item.commentContent }</p>
                </div>
            </div>
        );
    }
}

export default Comment;
