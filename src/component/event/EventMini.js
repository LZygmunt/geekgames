import React, {Component} from "react";

import "./event-mini.css";

class EventMini extends Component {

  state = {
    isFollow: false
  };

  componentDidMount() {
    this.setState({isFollow: this.props.item.isFollow})
  }

  followIt = () => {
    this.setState(prevState => {
      return{
        isFollow: !prevState.isFollow
      }
    });
  };

  render() {
    const props = this.props.item;
    const { isFollow } = this.state;

    return (
      <div className="event-mini">
        <div className="info">
          <p>
            {props.dateOfEvent}
            <span><i className="fas fa-cube"> </i></span>
            {props.placeOfEvent}
            <span onClick={this.followIt}>
              <i className="fas fa-plus" data-name={"follow-" + props.id}> </i>
              {isFollow && "Obserwujesz"}
            </span>
          </p>
        </div>
        <div className="game info">
          <p>
            <a href="#">
              {props.gameOfEvent}
            </a>
          </p>
        </div>
        <div className="title info">
          <p>
            <a href="#">
              {props.titleOfEvent}
            </a>
          </p>
        </div>
      </div>
    );
  }
}

export default EventMini;
