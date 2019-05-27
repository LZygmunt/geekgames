import React from "react";
import { Notifications } from "./";
import { connect } from "react-redux";
import { firestoreConnect } from "react-redux-firebase";
import { compose } from "redux";


import "./notifications.css";

const NotificationsList = ({ notifications }) => {
  const notification = (notifications && notifications.length) ? notifications: false;

  return (
    <div style={{height: "200px",overflowY: "auto"}}>
      <div className="notification-list">
      { notification ?
        notification.map(notification => <Notifications message={ notification.content } key={ notification.id }/>) :
        <Notifications message="Brak powiadomień"/> }
    </div>
    </div>
  )
};

const mapStoreToProps = state => {
  return {
    notifications: state.firestore.ordered.notifications
  }
};

export default compose(
  firestoreConnect([
    { collection: "notifications", orderBy: ["created", "desc"], limit: 5 }
  ]),
  connect(mapStoreToProps)
)(NotificationsList);
