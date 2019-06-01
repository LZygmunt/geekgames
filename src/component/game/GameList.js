import React from 'react';
import { Link } from "react-router-dom";

const GameList = ({ games }) => {
  //TODO wprowadzić ilość obserwujących, postów oraz wydarzeń
  return (<div className="game-list">
    <div id="game-header-table" style={{width:"100%"}}>
      <div className="game-search">
        <input type="text" placeholder="Zacznij pisać, aby wyszukać grę" />
      </div>
      <div className="game-item">
        <div className="title">Nazwa gry</div>
        <div className="create-date">Data stworzenia</div>
        <div className="author">Nick autora</div>
        <div className="num-of-user">
          Obserwujący
        </div>
        <div className="num-of-post">Posty</div>
        <div className="num-of-event">Wydarzenia</div>
      </div>
    </div>
    { games && games.map(game => {
      return (<div className="game-element" key={ game.id }>
        <Link to={ "/game/" + game.id }>
          <div className="game-item">
            <div className="title"> { game.title } </div>
            <div className="create-date"> { game.created.toDate().toLocaleDateString() }</div>
            <div className="author"> { game.authorNick }</div>
            <div className="num-of-user">
              <i className="far fa-user-circle"/>
              <i className="far fa-user-circle"/>
              <i className="far fa-user-circle"/>
              <p className="num-of-user-more"> +5</p>
            </div>
            <div className="num-of-post"> 16</div>
            <div className="num-of-event"> 4</div>
          </div>
        </Link>
      </div>)
    })}
  </div>);
};

export default GameList;
