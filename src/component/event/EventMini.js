import React, {Component} from "react";

import "./event-mini.css";

class EventMini extends Component {

  state = {
    isFollow: false
  };

  componentDidMount() {
    this.setState({ isFollow: this.props.event.isFollow })
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
    const { event } = this.props;
    const { isFollow } = this.state;

    return (
      <div className="event-mini">
        <div className="info">
          <p>
            <span className="slide-button-without-bg" onClick={ this.followIt }>
              <span>{ (isFollow)? "Obserwujesz" : "Obserwuj" }</span>
              <i className="fas fa-eye" data-name={ "follow-" + event.id }> </i>
            </span>
              <i className="fas fa-calendar-alt"><span>{ event.startDate } - { event.endDate }</span></i>
              <i className="fas fa-cube"><span>{ event.place }</span></i>


          </p>
        </div>
        <div className="game info">
          <p>
            <a href="#">
              { event.gameId }
            </a>
          </p>
        </div>
        <div className="title info">
          <p>
            <a href="#">
              { event.title }
            </a>
          </p>
        </div>
      </div>
    );
  }
}

export default EventMini;
