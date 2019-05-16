import React, {Component} from "react";
import Modal from "../modal/Modal";

class EventAdd extends Component {

  state = {
    title: "",
    place: "",
    date: new Date().toISOString().substr(0, 10),
    body: "Opis wydarzenia"
  };

  componentDidMount() {
    // console.log("this my date: " + this.state.date)
  }

  handleChange = (event) => {
    this.setState({title: event.target.value})
  };

  handleSubmit = () => {
    console.log(this.state.title);
  };

  render() {
    return (
      <Modal title="Dodaj wydarzenie" handleClose={this.props.handleClose} show={this.props.show}>
        <form>
          <input
            type="text"
            placeholder="Nazwa wydarzenia"
            name="title"
            value={this.state.title}
            onChange={this.handleChange}
          />
          <input
            type="text"
            placeholder="Nazwa gry"
            name="title"
            value={this.state.title}
            onChange={this.handleChange}
          />
          <input
            type="text"
            placeholder="Miejsce"
            name="place"
            value={this.state.place}
            onChange={this.handleChange}
          />
          <input
            type="date"
            name="date"
            value={this.state.date}
            onChange={this.handleChange}
          />
          <textarea
            name="body"
            value={this.state.body}
            cols="30"
            rows="10"
            onChange={this.handleChange}
          />
          <button onClick={this.handleSubmit}>Dodaj</button>
        </form>
      </Modal>
    )
  }
}

export default EventAdd;
