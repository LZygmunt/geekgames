import React, {Component} from "react";

import "./event-mini.css";

class EventMini extends Component {

  state = {
    isFollow: false
  };

  componentDidMount() {
    this.setState({ isFollow: this.props.item.isFollow })
  }

  followIt = (event) => {
    this.setState(prevState => {
      return{
        isFollow: !prevState.isFollow
      }
    });

    if (event.target.textContent ==="Obserwujesz" ||  event.target.textContent ==="Obserwuj")
      event.target = event.target.nextSibling;
    if(event.target.className==="fas fa-eye-slash")
        event.target.className="fas fa-eye";
    else
        event.target.className="fas fa-eye-slash";
  };

  render() {
    const props = this.props.item;
    const { isFollow } = this.state;

    return (
      <div className="event-mini">
        <div className="info">
          <p>
            <span>
            { props.dateOfEvent }
            <i className="fas fa-cube"> </i>
            { props.placeOfEvent }
            </span>
            <span className="slide-button-without-bg" onClick={ this.followIt }>
              <span>{ (isFollow)? "Obserwujesz" : "Obserwuj" }</span>
              <i className="fas fa-eye" data-name={ "follow-" + props.id }> </i>
            </span>
          </p>
        </div>
        <div className="game info">
          <p>
            <a href="#">
              { props.gameOfEvent }
            </a>
          </p>
        </div>
        <div className="title info">
          <p>
            <a href="#">
              { props.titleOfEvent }
            </a>
          </p>
        </div>
      </div>
    );
  }
}

export default EventMini;
