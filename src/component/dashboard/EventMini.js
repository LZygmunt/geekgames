import React, { Component } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
import { followEvent, unfollowEvent } from "../../store/actions/postActions";

import "./event-mini.css";

class EventMini extends Component {
  followIt = () => {
    (this.props.isFollow.length) ?
      this.props.unfollowMini(this.props.isFollow[0].id, this.props.event):
      this.props.followMini(this.props.event.id, this.props.event);
  };

  render() {
    const { event, isFollow } = this.props;

    //todo zabezpieczenie dat - początkowa musi być mniejsza niż końcowa
    return (
      <div className="event-mini">
        <div className="info">
          <p>
            <span className="slide-button-without-bg" onClick={ this.followIt }>
              <span>{ isFollow && (isFollow.length ? "Obserwujesz" : "Obserwuj") }</span>
              <i className={ isFollow && (isFollow.length ? "fas fa-eye-slash": "fas fa-eye") }> </i>
            </span>
              <i className="fas fa-calendar-alt"><span>{ event.startDate } - { event.endDate }</span></i>
              <i className="fas fa-cube"><span>{ event.place }</span></i>
          </p>
        </div>
        <div className="game info">
          <p>
            <Link to={ "/game/" + event.gameId }>
              { event.gameTitle }
            </Link>
          </p>
        </div>
        <div className="title info">
          <p>
            <Link to={ "/event/" + event.id }>
              { event.title }
            </Link>
          </p>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state, ownProps) => {
  return {
    auth: state.firebase.auth,
    isFollow: ownProps.follow && ownProps.follow.filter(follow => follow.authorId === state.firebase.auth.uid)
  }
};
const mapDispatchToProps = dispatch => {
  return {
    followMini: (eventId, event) => dispatch(followEvent(eventId, event)),
    unfollowMini: (followId, event) => dispatch(unfollowEvent(followId, event))
  }
};

export default connect(mapStateToProps, mapDispatchToProps)(EventMini);
