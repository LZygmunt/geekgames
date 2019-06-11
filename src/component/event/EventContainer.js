import React from 'react';
import { EventList } from "./";
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";

import "./event-responsive.css";

const EventContainer = ({ events, auth }) => {
  return (auth.uid) ? <EventList />: (<Redirect to="/"/>);
};

const mapStoreToProps = state => {
  return {
    auth: state.firebase.auth,
    events: state.firestore.ordered.events
  }
};

export default connect(mapStoreToProps)(EventContainer);
