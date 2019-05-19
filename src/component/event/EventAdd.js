import React, { Component } from "react";
import Modal from "../modal/Modal";
import { connect } from "react-redux";
import { createEvent } from "../../store/actions/postActions";

class EventAdd extends Component {

  state = {
    title: "",
    place: "",
    desc: "",
    startDate: "",
    endDate: ""
  };

  handleChange = event => {
    this.setState({ [event.target.name]: event.target.value })
  };

  handleSubmit = event => {
    event.preventDefault();
    this.props.createEvent(this.state, this.props.gameId);
    this.props.handleClose(event);
    this.setState({
      title: "",
      place: "",
      desc: "",
      startDate: "",
      endDate: ""
    })
  };

  render() {
    //TODO zrobić od do w datach
    const { title, place, desc, startDate, endDate } = this.state;
    return (
      <Modal title="Dodaj wydarzenie" handleClose={ this.props.handleClose } show={ this.props.show }>
        <form>
          <input
            type="text"
            placeholder="Nazwa wydarzenia"
            name="title"
            value={ title }
            onChange={ this.handleChange }
          />
          <input
            type="text"
            placeholder="Miejsce"
            name="place"
            value={ place }
            onChange={ this.handleChange }
          />
          <input
            type="date"
            name="startDate"
            value={ startDate }
            onChange={ this.handleChange }
          />
          <input
            type="date"
            name="endDate"
            value={ endDate }
            onChange={ this.handleChange }
          />
          <textarea
            name="desc"
            value={ desc }
            placeholder={ "Wprowadź opis wydarzenia..." }
            cols="30"
            rows="10"
            onChange={ this.handleChange }
          />
          <button onClick={ this.handleSubmit }>Dodaj</button>
        </form>
      </Modal>
    )
  }
}

const mapDispatchToProps = dispatch => {
  return {
    createEvent: (event, gameId) => dispatch(createEvent(event, gameId))
  }
};

export default connect(null, mapDispatchToProps)(EventAdd);
