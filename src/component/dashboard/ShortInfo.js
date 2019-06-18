import React from "react";
import { EventMiniList, NotificationsList } from "./";
import { connect } from "react-redux";

/**
 * Komponent przechowujący listę powiadomień oraz listę wydarzeń najbliższych
 * @param auth - Obiekt autoryzowanego użytkownika
 * @returns {null} - Zwraca panel lewy lub brak w przypadku braku autoryzacji użytkownika
 */
const ShortInfo = ({ auth }) => {

  return (auth.uid) ?
    (<div id="slide-event" style={{ display: "block" }}>
      <div id="fixed">
        <NotificationsList/>
        <EventMiniList/>
      </div>
    </div>) : null
};

// Zaciągnięcie ze store inforamcji o autoryzowanym użytkowniku
const mapStoreToProps = store => {
  return {
    auth: store.firebase.auth
  }
};

export default connect(mapStoreToProps)(ShortInfo);
