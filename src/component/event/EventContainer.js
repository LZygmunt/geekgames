import React from 'react';
import { EventList } from "./";
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";

import "./event-responsive.css";

/**
 * Komponent odpowiadający za przechowywanie widoku listy wydarzeń
 * @param auth - Obiekt przechowujący informacje o użytkowniku autoryzowanym
 * @return {*} - Zwraca widok listy wydarzeń
 */
const EventContainer = ({ auth }) => {
  return (auth.uid) ? <EventList />: (<Redirect to="/"/>);
};

/**
 * Zaciąga dane ze store
 * @param store - Magazyn przechowujący dane aplikacji
 * @return {{auth: ((app?: firebase.app.App) => firebase.auth.Auth) | (() => FirebaseAuth) | firebase.auth}} - Zwracany
 * jest użytkownik autoryzowany
 */
const mapStoreToProps = store => {
  return {
    auth: store.firebase.auth
  }
};

export default connect(mapStoreToProps)(EventContainer);
