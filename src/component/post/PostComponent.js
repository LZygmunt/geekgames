import React, {Component} from "react";
import "./post.css"
import "./comments.css"
import { CommentList, PostDescribe } from "./";

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
    const { post } = this.props;
    const { showComment } = this.state;

    return (<div className="post">
        <PostDescribe post={post}/>
        { showComment ? <CommentList postId={post.id}/>: <div onClick={ this.showComment }>Rozwiń</div> }
    </div>);
  }
}

export default PostComponent;
