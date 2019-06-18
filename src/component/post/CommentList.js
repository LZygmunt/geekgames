import React, { Component } from "react";
import { Comment } from "./index";
import { connect } from "react-redux";
import { createComment } from "../../store/actions/postActions";
import { firebase } from "../../config/fbConfig"

class CommentList extends Component{
  state = {
    newComment: "",
    comments: [],
    more: false,
    demount: null
  };

  componentDidMount = async () => {
    this.setState({ demount: await this.showMore() });

    if (this.state.demount && this.state.demount.docs && this.state.demount.docs.length > 1) {
      this.setState({
        more: true
      });
    }
  };

  componentWillUnmount() {
    this.state.demount();
  }

  getMore = async () => {
    const { comments } = this.state;
    let lastComment = comments && comments[comments.length - 1];
    this.setState({ demount: await this.showMore(lastComment) });

    if (this.state.demount && this.state.demount.docs && this.state.demount.docs.length <= 1) {
      this.setState({
        more: false
      })
    }
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
      postId: (this.props.postId) ? this.props.postId: "",
      eventId: (this.props.eventId) ? this.props.eventId: "",
      appearTitle: this.props.title,
      message: (this.props.eventId) ? "event": "post",
      gameId: this.props.gameId
    };
    this.props.createComment(comment);
    this.setState({
      newComment: ""
    })
  };

  showMore = async lastComment => {
    const ref = firebase.firestore().collection('comments');
    try {
      let startAfter = lastComment && await firebase.firestore().collection('comments').doc(lastComment.id).get();

      let path, idValue;
      if (this.props.postId) {
        path = "postId";
        idValue = this.props.postId
      } else {
        path = "eventId";
        idValue = this.props.eventId
      }

      let query;
      lastComment
        ? query = ref
          .where(path, "==", idValue)
          .orderBy("created", "desc")
          .startAfter(startAfter)
          .limit(5)
        : query = ref
          .where(path, "==", idValue)
          .orderBy("created", "desc")
          .limit(5);
      return await query.onSnapshot({
        next: snapshot => {
          if (snapshot.docs.length < 5) this.setState({ more: false });
          if (snapshot.docs.length === 5) this.setState({ more: true });
          let cmnt = [];
          let top = false;
          snapshot.docs.forEach(doc => this.state.comments.find(comment => comment.id === doc.id)
            ? top = true
            : cmnt.push({ ...doc.data(), id: doc.id })
          );
          this.setState(prevState => {
            cmnt = top ? cmnt.concat(prevState.comments) : prevState.comments.concat(cmnt);
            return {
              comments: cmnt
            }
          });
        },
        error: error => console.log(error),
        complete: () => console.log("Query complete")
      });
    } catch (error) {
      console.log(error)
    }
  };

  render() {
    const { comments } = this.state;

    const commentList = comments
      && comments.map(comment => <Comment comment={ comment } key={ comment.id }/>);
    return (<div className={ "comments " }>
      <div className="comment-add">
        <input
          type="text"
          name="newComment"
          placeholder="Zacznij pisać..."
          value={ this.state.newComment }
          onChange={ this.handleChange }
          onKeyDown={ event => event.key === "Enter" ? this.addComment(event): null }
        />
        <i className="fas fa-paper-plane" onClick={ this.addComment }/>
      </div>
      <div className="comment-list">
        { commentList }
      </div>
      {this.state.more ? <div className="comment-extend">
        <div className="button" onClick={this.getMore}>Więcej komentarzy...</div>
      </div>:null}
    </div>)
  }
}

const mapDispatchToProps = dispatch => {
  return {
    createComment: comment => dispatch(createComment(comment))
  }
};

export default connect(null, mapDispatchToProps)(CommentList);
