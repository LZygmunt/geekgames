import React from "react";
import { EventMini } from "./";
import { connect } from "react-redux";
import { compose } from "redux";
import { firestoreConnect } from "react-redux-firebase";

/**
 * Komponent odpowiadający za widok listy wydarzeń w skróconej wersji
 * @param auth - Obiekt autoryzowanego użytkownika
 * @param events - Obiekt listy wydarzeń
 * @param followers - Obiekt listy obserwujących
 * @returns {null} - Zwraca widok listy wydarzeń
 */
const EventMiniList = ({ auth, events, followers }) => {

  const eventList = events && events.map(event => <EventMini
    key={ event.id }
    event={ event }
    follow={ followers && followers.filter(follow => follow.followThingId === event.id && follow) }
  />);

  return (auth.uid) ?
    (<div style={{ marginTop:"20px", height: "435px", overflowY: "auto" }}>
      { eventList }
    </div>) : null
};

// Zaciągnięcie ze store autoryzowanego użytkownika, wydarzeń i obserwujących, i zapisanie ich w propsach
const mapStoreToProps = store => {
  return {
    auth: store.firebase.auth,
    events: store.firestore.ordered.eventMiniList,
    followers: store.firestore.ordered.eventMiniFollowers
  }
};

// Połączenie z firestore, zaciągnięcie wydareń i obserwujących oraz zapisanie ich w store
export default compose(
  firestoreConnect([
    {
      collection: "events",
      where: ["endDate", ">=", new Date().toJSON().slice(0,10)],
      orderBy: ["endDate", "asc"],
      limit: 5,
      storeAs: "eventMiniList"
    },
    {
      collection: "followers",
      storeAs: "eventMiniFollowers"
    }
  ]),
  connect(mapStoreToProps)
)(EventMiniList);
