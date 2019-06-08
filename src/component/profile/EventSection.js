import React, { Component } from "react";
import { connect } from "react-redux";
import { compose } from "redux";
import { firestoreConnect } from "react-redux-firebase";
import { Link } from "react-router-dom";
import Search from "../search/Search";


class EventSection extends Component {
  render() {
    const eventList = this.props.followsEvent && this.props.followsEvent.map(event =>
      this.props.follows && this.props.follows.map(follow =>
        (follow.followThingId === event.id) && <Link to={ `/event/${ event.id }` } key={ event.id }>
        <li>
          <span>{ event.title }</span>
          <span>{ event.place }</span>
          <span>{ event.startDate } - { event.endDate }</span>
        </li>
      </Link>));

    return (
      <div className="event-section">
        <div className="event-search">
          <h1>Obserwowane wydarzenia:</h1>

          <Search
            message="events"
            collection="followers"
            className="event-search"
            placeholder="Zacznij pisać, aby wyszukać grę"
            followerId={ this.props.followerId }
          />
        </div>
      </div>
    );
  }
}

/*
* <Search
          message="games"
          collection="followers"
          className="game-search"
          placeholder="Zacznij pisać, aby wyszukać grę"
        />
* */

const mapStoreToProps = state => {
  return {
    followsEvent: state.firestore.ordered.followsEvent
  }
};

export default compose(
  firestoreConnect([
    {
      collection: "events",
      where: ["startDate", ">=", new Date().toJSON().slice(0,10)],
      orderBy: ["startDate", "asc"],
      storeAs: "followsEvent"
    }
  ]),
  connect(mapStoreToProps)
)(EventSection);
