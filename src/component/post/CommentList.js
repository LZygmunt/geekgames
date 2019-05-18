import React, { Component } from "react";
import logo1 from "../../images/logo-geek-games.png";
import {Comment} from "./index";

class CommentList extends Component{
  state = {
    newComment: ""
  };

  handleChange = (event) => {
    this.setState({
      [event.target.name]: event.target.value
    })
  };

  addComment = (event) => {
    console.log("Submit -> ", this.state);
  };

  showMore = () => {
    alert("Za duuuużo i zwiększyła");
  };

  render() {
    const data = [
      {
        id: 1,
        imgUrl: logo1,
        userName: "User 1",
        commentContent: "Lorem ipsum i coś tam dalej i dalej... To jest tylko treść komentarza, " +
          "która nie koniecznie jest ważna"
      },
      {
        id: 2,
        imgUrl: logo1,
        userName: "User 1",
        commentContent: "Lorem ipsum i coś tam dalej i dalej... To jest tylko treść komentarza, " +
          "która nie koniecznie jest ważna. Lorem ipsum i coś tam dalej i dalej... To jest tylko treść " +
          "komentarza, która nie koniecznie jest ważna. Lorem ipsum i coś tam dalej i dalej... To jest " +
          "tylko treść komentarza, która nie koniecznie jest ważna. Lorem ipsum i coś tam dalej i dalej... " +
          "To jest tylko treść komentarza, która nie koniecznie jest ważna. Lorem ipsum i coś tam dalej i " +
          "dalej... To jest tylko treść komentarza, która nie koniecznie jest ważna. Lorem ipsum i coś tam " +
          "dalej i dalej... To jest tylko treść komentarza, która nie koniecznie jest ważna. "
      },
      {
        id: 3,
        imgUrl: logo1,
        userName: "User 1",
        commentContent: "Lorem ipsum i coś tam dalej i dalej... To jest tylko treść komentarza, " +
          "która nie koniecznie jest ważna"
      },
    ];

    const commentList = data.map(item => <Comment item={item} key={item.id}/>);

    return (<div className="comments">
      <div className="comment-add">
        <input
          type="text"
          name="newComment"
          placeholder="Zacznij pisać..."
          value={this.state.newComment}
          onChange={this.handleChange}
        />
        <i className="fas fa-paper-plane" onClick={this.addComment}/>
      </div>{/* Dodaj komentarz */}
      <div className="comment-list">
        {commentList}
      </div>{/* Lista komentarzy */}
      <div className="comment-extend">
        <div className="button" onClick={this.showMore}>Więcej komentarzy...</div>
      </div>{/* Pokaż komentarze */}
    </div>)
  }
}

export default CommentList;
