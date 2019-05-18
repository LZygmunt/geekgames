import React from 'react';
import { Link } from "react-router-dom";

const GameList = ({ games }) => {
  return (
    <div className="game-list">
      {games && games.map(game => {
        return (<Link to={"/game/" + game.id} key={game.id}>
          <div>
            {game.title}
          </div>
        </Link>)
      })}
    </div>
  );
};

export default GameList;
