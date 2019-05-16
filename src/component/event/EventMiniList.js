import React from "react";
import { EventMini } from "./";
import { connect } from "react-redux";

const EventMiniList = (props) => {
  const { auth } = props;

  const data = [
    {
      id: 0,
      dateOfEvent: "2012-05-29",
      placeOfEvent: "Place",
      gameOfEvent: "Go to page game",
      titleOfEvent: "Title of event... Go to page event",
      isFollow: true
    },
    {
      id: 1,
      dateOfEvent: "2000-10-02",
      placeOfEvent: "Place",
      gameOfEvent: "Go to page game",
      titleOfEvent: "Title of event... Go to page event",
      isFollow: false
    },
    {
      id: 2,
      dateOfEvent: "1000-10-01",
      placeOfEvent: "Place",
      gameOfEvent: "Go to page game",
      titleOfEvent: "Title of event... Go to page event",
      isFollow: false
    },
    {
      id: 3,
      dateOfEvent: "1000-10-01",
      placeOfEvent: "Place",
      gameOfEvent: "Go to page game",
      titleOfEvent: "Title of event... Go to page event",
      isFollow: true
    }
  ];

  const eventList = data.map(item => <EventMini key={item.id} item={item}/>);
  //todo ustawić mini event na fixed
  return (auth.uid) ?
    (<div id="slide-event">
      { eventList }
    </div>) : null
};

const mapStateToProps = (state) => {
  // console.log("EventMiniList log -> ",state);
  return {
    auth: state.firebase.auth,
    // auth: {uid: 1},
    posts: state.firestore.ordered.post
  }
};

export default connect(mapStateToProps)(EventMiniList);
