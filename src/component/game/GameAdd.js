import React, {Component} from "react";
import Modal from "../modal/Modal";

class GameAdd extends Component {

  state = {
    title: "",
    image: "",
    desc: "Opis gry",
    follow: true
  };

  handleChange = (event) => {
    this.setState({[event.target.name]: event.target.value})
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
            className="custom-file-input"
          />

          <textarea
            name="desc"
            value={this.state.desc}
            onChange={this.handleChange}
            rows="10"
          />
          <button onClick={this.handleSubmit}>Dodaj</button>
        </form>
      </Modal>
    )
  }
}

export default GameAdd;
