import React from "react";
import { EventMini } from "./";
import { connect } from "react-redux";
import { compose } from "redux";
import { firestoreConnect } from "react-redux-firebase";

const EventMiniList = (props) => {

  const { auth, events, followers } = props;
  const eventList = events && events.map(event => <EventMini
    key={ event.id }
    event={ event }
    follow={ followers && followers.filter(follow => follow.followThingId === event.id && follow) }
  />);

  return (auth.uid) ?
    (<div style={{ marginTop:"20px", height: "435px", overflowY: "auto" }}>
      { eventList }
    </div>) : null
};

const mapStoreToProps = state => {
  return {
    auth: state.firebase.auth,
    events: state.firestore.ordered.eventMiniList,
    followers: state.firestore.ordered.eventMiniFollowers
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
    },
    {
      collection: "followers",
      storeAs: "eventMiniFollowers"
    }
  ]),
  connect(mapStoreToProps)
)(EventMiniList);
