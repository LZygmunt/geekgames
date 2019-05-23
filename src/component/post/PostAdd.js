import React, {Component} from 'react';
import { createPost } from "../../store/actions/postActions";
import {connect} from "react-redux";


import "./post-add.css";

class PostAdd extends Component {
  state = {
    rotatePlus: "rotate-plus",
    toggleForm: "hide-post-add",
    title: "",
    desc: ""
  };
  togglePost = () => {
    this.setState(prevState => {
      return {
        toggleForm: (prevState.toggleForm === "hide-post-add") ? "show-post-add" : "hide-post-add",
        rotatePlus: (prevState.toggleForm === "hide-post-add") ? "" : "rotate-plus"
      }
    });

    if (this.state.toggleForm === "show-post-add"){
      document.getElementsByClassName("show-post-add")[0].style.background="all 1s linear";
        document.getElementById("post-form").style.display = "none";
  }else {
      document.getElementsByClassName("hide-post-add")[0].style.transition="all 1s linear";
      setTimeout(function () {
        document.getElementById("post-form").style.display = "block";
      }, 1000);
    }
  };

  handleSubmit = (event) => {
    event.preventDefault();
    const post = {
      title: this.state.title,
      desc: this.state.desc,
      gameId: this.props.game.id,
      gameTitle: this.props.game.title
    };

    this.props.createPost(post);
    this.togglePost();
  };

  handleChange = (event) => {
    this.setState({
      [event.target.name]: event.target.value
    });
  };

  render() {
    return (
      <div className="post post-add">
        <i className={"fas fa-plus " + this.state.rotatePlus} onClick={this.togglePost}/>
        <div className={this.state.toggleForm}>
          <form onSubmit={this.handleSubmit} id="post-form" style={{display:"none"}}>
            <input
              type="text"
              name="title"
              placeholder="Podaj tytuł wpisu..."
              value={this.state.title}
              onChange={this.handleChange}
            />
            <textarea
              name="desc"
              value={this.state.desc}
              placeholder="Podaj opis wpisu..."
              onChange={this.handleChange}
            />
            <button>Dodaj post</button>
          </form>
        </div>
      </div>
    );
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    createPost: post => dispatch(createPost(post))
  }
};

export default connect(null, mapDispatchToProps)(PostAdd);
