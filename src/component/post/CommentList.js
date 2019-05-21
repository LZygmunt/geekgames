import React, { Component } from "react";
import { Comment } from "./index";
import { connect } from "react-redux";
import { createComment } from "../../store/actions/postActions";
import {compose} from "redux";
import {firestoreConnect} from "react-redux-firebase";

class CommentList extends Component{
  state = {
    newComment: ""
  };

  handleChange = (event) => {
    this.setState({
      [event.target.name]: event.target.value
    })
  };

  addComment = event => {
    event.preventDefault();
    const comment = {
      comment: this.state.newComment,
      postId: this.props.postId
    };
    this.props.createComment(comment);
    this.setState({
      newComment: ""
    })
  };

  showMore = () => {
    alert("Za duuuużo i zwiększyła");
  };

  render() {
    const { comments, postId } = this.props;
    // const commentsFromPost = comments && comments.filter(comm => (comm.postId === postId) && comm);

    const commentList = comments
      && comments.map(comment => <Comment comment={ comment } key={ comment.id }/>);

    return (<div className={ "comments " + this.props.showComment }>
      <div className="comment-add">
        <input
          type="text"
          name="newComment"
          placeholder="Zacznij pisać..."
          value={ this.state.newComment }
          onChange={ this.handleChange }
        />
        <i className="fas fa-paper-plane" onClick={ this.addComment }/>
      </div>
      <div className="comment-list">
        { commentList }
      </div>
      <div className="comment-extend">
        <div className="button" onClick={ this.showMore }>Więcej komentarzy...</div>
      </div>
    </div>)
  }
}

const mapStoreToProps = state => {
  return {
    comments: state.firestore.ordered.comments
  }
};

const mapDispatchToProps = dispatch => {
  return {
    createComment: comment => dispatch(createComment(comment))
  }
};

export default compose(
  firestoreConnect( props => [
    { collection: "comments",  where: ["postId", "==", props.postId] }
  ]),
  connect(mapStoreToProps, mapDispatchToProps)
)(CommentList);
