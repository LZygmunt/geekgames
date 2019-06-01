import React from "react";
import { EventMiniList, NotificationsList } from "./";
import { connect } from "react-redux";

const ShortInfo = ({ auth }) => {
  window.onscroll = () => {
    document.querySelectorAll("#fixed, #game-header-table").forEach( selector => {
      (selector !== null && window.pageYOffset > 0) ?
        selector.className = "sticky" :
        selector.className = "";
    });
  };

  return (auth.uid) ?
    (<div id="slide-event" style={{ display: "block" }}>
      <div id="fixed">
        <NotificationsList/>
        <EventMiniList/>
      </div>
    </div>) : null
};

const mapStoreToProps = state => {
  return {
    auth: state.firebase.auth
  }
};

export default connect(mapStoreToProps)(ShortInfo);;
