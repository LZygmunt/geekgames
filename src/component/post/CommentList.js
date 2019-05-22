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

  showMore = async () => {
    // let first = db.collection("cities")
    //   .orderBy("population")
    //   .limit(25);
    //
    // return first.get().then(function (documentSnapshots) {
    //   // Get the last visible document
    //   var lastVisible = documentSnapshots.docs[documentSnapshots.docs.length-1];
    //   console.log("last", lastVisible);
    //
    //   // Construct a new query starting at this document,
    //   // get the next 25 cities.
    //   var next = db.collection("cities")
    //     .orderBy("population")
    //     .startAfter(lastVisible)
    //     .limit(25);
    // });

  };

  render() {
    const { comments} = this.props;
// console.log(this.props)
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

const mapStoreToProps = (state, ownProps) => {
  console.log(state)
  return {
    comments: state.firestore.ordered[`comments-${ownProps.postId}`],
    last: state.firestore.ordered[`comments-${ownProps.postId}`] && state.firestore.ordered[`comments-${ownProps.postId}`][4]
  }
};

const mapDispatchToProps = dispatch => {
  return {
    createComment: comment => dispatch(createComment(comment))
  }
};

export default compose(
  firestoreConnect( props => [
    {
      collection: "comments",
      orderBy: ["created", "desc"],
      where: ["postId", "==", props.postId],
      storeAs: `comments-${props.postId}`
    }
  ]),
  connect(mapStoreToProps, mapDispatchToProps)
)(CommentList);
