import React from 'react';
import Search from "../search/Search";

/**
 * Komponent odpowiadający za wyświetlenie listy wydarzeń wyszukanych
 * @return {*} - Zwraca widok listy wyszukanych wydarzeń
 */
const EventList = () => {
  return (
    <Search
      message="event-list"
      collection="events"
      className="game-search"
      placeholder="Zacznij pisać, aby wyszukać wydarzenie"
    />
  );
};

export default EventList;
