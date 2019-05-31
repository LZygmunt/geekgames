import React from 'react';
import { EventList } from "./";
import { connect } from "react-redux";
import { compose } from "redux";
import { firestoreConnect } from "react-redux-firebase";
import { Redirect } from "react-router-dom";

import "./event-responsive.css";

const EventContainer = ({ events, auth }) => {

  window.onscroll = function(){
    const header = document.getElementById("game-header-table");
    if(header!=null) {
      const sticky = header.offsetTop;

      if (window.pageYOffset > sticky) {
        header.className = "sticky";
      } else {
        header.className = "";
      }
    }
  };

  return (auth.uid) ? (
    <EventList events={ events }/>
  ): (<Redirect to="/"/>);
};

const mapStoreToProps = state => {
  return {
    auth: state.firebase.auth,
    events: state.firestore.ordered.events
  }
};

export default compose(
  connect(mapStoreToProps),
  firestoreConnect([
    { collection: "events", orderBy: ["created"] }
  ])
)(EventContainer);
