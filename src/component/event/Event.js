import React, { Component } from "react";
import "./style.css";
import { Redirect } from "react-router-dom";
import { connect } from "react-redux";
import { compose } from "redux";
import { firestoreConnect } from "react-redux-firebase";
import { Link } from "react-router-dom";
import { followEvent, unfollowEvent } from "../../store/actions/postActions";

class Event extends Component {

  followIt = event => {
    event.target.dataset.follower === "false" ?
      this.props.followEvent(this.props.match.params.id):
      this.props.unfollowEvent(this.props.followThis[0].id)
  };

  render() {
    const { auth, match, followers, followThis } = this.props;
    const event = this.props.event && this.props.event[match.params.id];

    return (auth.uid) ? (
      (event) ? (<div id="event-content">
        <div id="background-header">
          <div className="image">
            <img src="../../images/photo1.jpg" alt="bg"/>
          </div>
          <div className="background-image"/>
          <h2 id="title-header">{ event.title }</h2>
        </div>

        <div className="event-info">
          <h2 id="place">{ event.place }</h2>
          <h2 id="game"><Link to={ "/game/" + event.gameId }> { event.gameTitle }</Link></h2>
          <h2 id="date">{ event.startDate } - { event.endDate }</h2>
        </div>
        <div id="event-description">{ event.desc }</div>

        <input
          type="button"
          className="join-button"
          onClick={this.followIt}
          value={ followThis ? "Nie bierz udziału": "Weź udział" }
          data-follower={ !!followThis }
        />

        <div className="joined">
          <h2>Kilka uczestników, którzy chcą wziąć udział:</h2>
          <ul>
            { followers ? (followers.length ?
              followers.map(follow => <li key={ follow.id }>{ follow.authorNick }</li>) :
              <li>Brak obserwujących</li>):
              <li>Brak obserwujących</li>}
          </ul>
        </div>

      </div>) : (<div>Ładowanie wydarzenia...</div>)) : (<Redirect to="/"/>);
  }
}

const mapDispatchToProps = dispatch => {
  return {
    followEvent: event => dispatch(followEvent(event)),
    unfollowEvent: event => dispatch(unfollowEvent(event))
  }
};

const mapStoreToProps = state => {
  const { followers } = state.firestore.ordered;
  const followThis = followers
    && followers.filter(follow => follow.authorId === state.firebase.auth.uid && follow);
  return {
    auth: state.firebase.auth,
    event: state.firestore.data.events,
    followers: followers,
    followThis: followThis ? followThis.length && followThis: null
  }
};

export default compose(
  firestoreConnect(props => [
    { collection: "events", doc: props.match.params.id },
    {
      collection: "followers",
      where: ["followThingId", "==", props.match.params.id],
      limit: 8
    }
  ]),
  connect(mapStoreToProps, mapDispatchToProps)
)(Event);
