import React from "react";
import { EventMini } from "./";
import { connect } from "react-redux";
import { compose } from "redux";
import { firestoreConnect } from "react-redux-firebase";

const EventMiniList = (props) => {
  const { auth, events } = props;
  const eventList = events && events.map(event => <EventMini key={ event.id } event={ event }/>);

//todo ustawić mini event na fixed
  return (auth.uid) ?
    (<div id="slide-event">
      { eventList }
    </div>) : null
};

const mapStoreToProps = state => {
  return {
    auth: state.firebase.auth,
    events: state.firestore.ordered.eventMiniList
  }
};

export default compose(
  firestoreConnect([
    {
      collection: "events",
      where: ["startDate", ">=", new Date().toJSON().slice(0,10)],
      orderBy: ["startDate", "asc"],
      limit: 5,
      storeAs: "eventMiniList"
    }
  ]),
  connect(mapStoreToProps)
)(EventMiniList);
