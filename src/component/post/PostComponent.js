import React, { Component } from "react";
import { CommentList, PostDescribe } from "./";
import { compose } from "redux";
import { firestoreConnect } from "react-redux-firebase";
import { connect } from "react-redux";

import "./post.css"
import "./comments.css"

class PostComponent extends Component {
  state = {
    showComment: false
  };

  showComment = () => {
    this.setState({
      showComment: true
    })
  };

  render() {
    const { post, comments } = this.props;
    const { showComment } = this.state;

    const commentsFromPost = comments && comments.filter(comm => (comm.postId === post.id) && comm);

    return (<div className="post">
        <PostDescribe post={post}/>
        { showComment ?
          <CommentList comments={ commentsFromPost } postId={ post.id }/>:
          <div onClick={ this.showComment }>Rozwiń</div>
        }
    </div>);
  }
}

const mapStoreToProps = state => {
  return {
    comments: state.firestore.ordered.comments
  }
};

export default compose(
  firestoreConnect( [
    { collection: "comments", orderBy: ["created", "desc"] }
  ]),
  connect(mapStoreToProps)
)(PostComponent);
