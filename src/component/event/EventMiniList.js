import React from "react";
import { EventMini } from "./";
import { connect } from "react-redux";
import { compose } from "redux";
import { firestoreConnect } from "react-redux-firebase";

const EventMiniList = (props) => {
  const { auth, events } = props;

  const eventList = events && events.map(event => <EventMini key={ event.id } event={ event } />);
  //todo ustawić mini event na fixed
  return (auth.uid) ?
    (<div id="slide-event">
      { eventList }
    </div>) : null
};

const mapStoreToProps = state => {
  return {
    auth: state.firebase.auth,
    events: state.firestore.ordered.events
  }
};

export default compose(
  firestoreConnect([
    { collection: "events",  limit: 5}
  ]),
  connect(mapStoreToProps)
)(EventMiniList);
