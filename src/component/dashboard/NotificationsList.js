import React from "react";
import { Notifications } from "./";
import { connect } from "react-redux";
import { firestoreConnect } from "react-redux-firebase";
import { compose } from "redux";


import "./notifications.css";

const NotificationsList = ({ notifications }) => {
  const notificationList = (notifications && notifications.length) ?
    notifications.map(notification => <Notifications notification={ notification } key={ notification.id }/>):
    <Notifications message="Brak powiadomień"/>;

  return (
    <div style={{ height: "220px",overflowY: "auto" }}>
      <div className="notification-list">
      { notificationList }
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
