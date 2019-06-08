import React from 'react';
import { Link } from "react-router-dom";
import Search from "../search/Search";

const EventList = ({ events }) => {
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
