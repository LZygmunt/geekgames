import React from 'react';
import { EventList } from "./";
import { connect } from "react-redux";
import { compose } from "redux";
import { firestoreConnect } from "react-redux-firebase";

const EventContainer = ({ events, auth }) => {
  return (auth.uid) ? (
    <EventList events={ events }/>
  ): (<div/>);
};

const mapStoreToProps = state => {
  return {
    auth: state.firebase.auth,
    // events: state.firestore.posts
  }
};

export default compose(
  connect(mapStoreToProps),
  firestoreConnect([
    { collection: "posts", orderBy: ["created"], where: ["isEvent", "==", true] }
  ])
)(EventContainer);
