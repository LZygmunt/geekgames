import React from 'react';
// import { Link } from "react-router-dom";
import Search from "../search/Search";

const GameList = ({games}) => {

  return (
    <Search
      message="game-list"
      collection="games"
      className="game-search"
      placeholder="Zacznij pisać, aby wyszukać grę"
    />
  )
};

export default GameList;
