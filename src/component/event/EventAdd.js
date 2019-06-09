import React, { Component } from "react";
import Modal from "../modal/Modal";
import { connect } from "react-redux";
import { createEvent } from "../../store/actions/postActions";

class EventAdd extends Component {

  state = {
    title: "",
    place: "",
    desc: "",
    startDate: new Date().toJSON().slice(0,10),
    endDate: new Date().toJSON().slice(0,10)
  };

  handleBlur = event => {
    let start = new Date(this.state.startDate.slice(0,4),this.state.startDate.slice(5,7),this.state.startDate.slice(8,10));
    let stop = new Date(this.state.endDate.slice(0,4),this.state.endDate.slice(5,7),this.state.endDate.slice(8,10));

    if(start > stop) {
      document.getElementById("errorDate").style.display='block';
      document.getElementById("submitButton").setAttribute('disabled','');
    } else{
      document.getElementById("errorDate").style.display='none';
      document.getElementById("submitButton").removeAttribute('disabled');

    }
  };

  handleChange = event => {
    this.setState({ [event.target.name]: event.target.value })
  };

  handleSubmit = event => {
    event.preventDefault();
    this.props.createEvent({...this.state, ...this.props.game, titleToLowerCase: this.state.title.toLowerCase()});
    this.props.handleClose(event);
    this.setState({
      title: "",
      place: "",
      desc: "",
      startDate: new Date().toJSON().slice(0,10),
      endDate: new Date().toJSON().slice(0,10)
    })
  };

  render() {
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
            onBlur={this.handleBlur}
            onChange={ this.handleChange }
            min={new Date().toJSON().slice(0,10)}
          />
          <span style={{padding: "0 16px"}}>-</span>
          <input
            type="date"
            name="endDate"
            value={ endDate }
            onBlur={this.handleBlur}
            onChange={ this.handleChange }
            min={new Date().toJSON().slice(0,10)}

          />
          <div id="errorDate" style={{display:'none'}}>Data rozpoczęcia jest później niż data zakończenia</div>
          <textarea
            name="desc"
            value={ desc }
            placeholder={ "Wprowadź opis wydarzenia..." }
            cols="30"
            rows="10"
            onChange={ this.handleChange }
          />
          <button id="submitButton" onClick={ this.handleSubmit }>Dodaj</button>
        </form>
      </Modal>
    )
  }
}

const mapDispatchToProps = dispatch => {
  return {
    createEvent: (event) => dispatch(createEvent(event))
  }
};

export default connect(null, mapDispatchToProps)(EventAdd);
