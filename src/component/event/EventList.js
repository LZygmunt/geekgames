import React from 'react';
import Search from "../search/Search";

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
