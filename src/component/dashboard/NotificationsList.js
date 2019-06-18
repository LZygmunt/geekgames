import React from "react";
import { Notifications } from "./";
import { connect } from "react-redux";
import { firestoreConnect } from "react-redux-firebase";
import { compose } from "redux";

import "./notifications.css";

/**
 * Komponent pobiera listę powiadomień i tworzy z niej mapę komponentów Notifications
 * @param notifications - Obiekt zawierający listę powiadomień zaciągniętych z firestore
 * @returns {*} - Zwraca listę powiadomień
 */
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

// Zaciągnięcie ze store listy powiadomień
const mapStoreToProps = store => {
  return {
    notifications: store.firestore.ordered.notifications
  }
};

// Połączenie z firestore, zaciągnięcie powiadomień dotyczących danego użytkownika oraz zapisanie ich w store
export default compose(
  firestoreConnect(props => [
    {
      collection: "notifications",
      orderBy: ["created", "desc"],
      where: ["followers", "array-contains", props.firebase._.authUid],
      limit: 5
    }
  ]),
  connect(mapStoreToProps)
)(NotificationsList);
