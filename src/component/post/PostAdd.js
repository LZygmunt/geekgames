import React, {Component} from 'react';
import { createPost } from "../../store/actions/postActions";
import {connect} from "react-redux";

class PostAdd extends Component {
  state = {
    rotatePlus: "",
    toggleForm: "hide",
    title: "",
    desc: ""
  };
  //todo plusa przesunąć na środek oraz gdy jest odwrócony przesunąć go na prawo
  togglePost = () => {
    this.setState(prevState => {
      return {
        toggleForm: (prevState.toggleForm === "hide") ? "show": "hide",
        rotatePlus: (prevState.toggleForm === "hide") ? "" : "rotate-plus"
      }
    });
  };

  handleSubmit = (event) => {
    event.preventDefault();
    this.props.createPost({title: this.state.title, desc: this.state.desc}, this.props.gameId);
    this.togglePost();
  };

  handleChange = (event) => {
    this.setState({
      [event.target.name]: event.target.value
    });
  };

  render() {
    return (
      <div className="post">
        <i className={"fas fa-plus " + this.state.rotatePlus} onClick={this.togglePost}/>
        <div className={this.state.toggleForm}>
          <form onSubmit={this.handleSubmit}>
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
    createPost: (post, gameId) => dispatch(createPost(post, gameId))
  }
};

export default connect(null, mapDispatchToProps)(PostAdd);
