import React from 'react';
import { EventList } from "./";
import { connect } from "react-redux";
import { compose } from "redux";
import { firestoreConnect } from "react-redux-firebase";
import { Redirect } from "react-router-dom";

import "./event-responsive.css";
import Loader from "../dashboard/Loader";

const EventContainer = ({ events, auth }) => {
  return (auth.uid) ? (events ?
    <EventList events={ events }/> : <Loader />
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
