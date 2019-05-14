import React, { Component } from "react";
import "./comment.css"
import "./comments.css"

class Comment extends Component{
    render(){
        const cmnt = this.props;
        return(
            <div className="comment">
                <div className="comment-identification">
                    <img
                        src={cmnt.imgUrl}
                        alt={cmnt.userName}
                    />
                    <p>{cmnt.userName}</p>
                </div>
                <div className="comment-content">
                    <p>{cmnt.commentContent}</p>
                </div>
            </div>
        );
    }
}

export default Comment;
