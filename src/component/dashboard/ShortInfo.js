import React from "react";
import { EventMiniList, NotificationsList } from "./";
import {connect} from "react-redux";

const ShortInfo = ({auth}) => {
  return (auth.uid) ?
    (<div id="slide-event">
      <NotificationsList />
      <EventMiniList />
    </div>) : null
};

const mapStoreToProps = state => {
  return {
    auth: state.firebase.auth
  }
};

export default connect(mapStoreToProps)(ShortInfo);
