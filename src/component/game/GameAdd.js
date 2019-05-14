import React, {Component} from "react";
import Modal from "../modal/Modal";

class GameAdd extends Component {

  state = {
    title: "",
    image: "",
    alt: "",
    body: "Opis gry",
    follow: true
  };

  handleChange = (event) => {
    this.setState({title: event.target.value})
  };

  handleSubmit = () => {
    console.log(this.state.title);
  };

  render() {
    return (
      <Modal show={this.props.show} title="Dodaj grę" handleClose={this.props.handleClose}>
        <form>
          <input
            type="text"
            placeholder="Nazwa gry"
            name="title"
            value={this.state.title}
            onChange={this.handleChange}
          />
          <input
            type="file"
            placeholder="Przeglądaj..."
            name="image"
          />
          <input
            type="text"
            name="alt"
            placeholder="Tekst alternatywny obrazu"
            value={this.state.alt}
            onChange={this.handleChange}
          />
          <textarea
            name="body"
            value={this.state.body}
            cols="30"
            rows="10"
          />
          <button onClick={this.handleSubmit}>Dodaj</button>
        </form>
      </Modal>
    )
  }
}

export default GameAdd;
