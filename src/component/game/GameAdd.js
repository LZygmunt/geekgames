import React, { Component } from "react";
import Modal from "../modal/Modal";
import { connect } from "react-redux";
import { createGame } from "../../store/actions/gameActions";

class GameAdd extends Component {

  state = {
    title: "",
    image: "",
    desc: "",
    alt: "tekst alternatywny"
  };

  handleChange = (event) => {
    this.setState({[event.target.name]: event.target.value})
  };

  handleSubmit = (event) => {
    event.preventDefault();
    this.props.createGame(this.state);
    this.props.handleClose(event);
  };

  render() {
    const { show, handleClose } = this.props;
    const { title, desc, image } = this.state;

    return (
      <Modal show={show} title="Dodaj grę" handleClose={handleClose}>
        <form>
          <input
            type="text"
            placeholder="Nazwa gry"
            name="title"
            value={title}
            onChange={this.handleChange}
          />
          <input
            type="file"
            name="image"
            className="custom-file-input"
          />
          <textarea
            name="desc"
            value={desc}
            placeholder="Podaj opis gry..."
            onChange={this.handleChange}
            rows="10"
          />
          <button onClick={this.handleSubmit}>Dodaj</button>
        </form>
      </Modal>
    )
  }
}

const mapDispatchToProps = dispatch => {
  return {
    createGame: game => dispatch(createGame(game))
  }
};

export default connect(null, mapDispatchToProps)(GameAdd);
