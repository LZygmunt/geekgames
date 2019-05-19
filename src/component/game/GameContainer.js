import React from 'react';
import { GameList } from "./";
import { connect } from "react-redux";
import { compose } from "redux";
import { firestoreConnect } from "react-redux-firebase";

import "./game.css"
import "./game-list.css"

const GameContainer = ({ games, auth, followers }) => {
  window.onscroll = function(){
    const header = document.getElementById("game-header-table");
    if(header!=null) {
      const sticky = header.offsetTop;

      if (window.pageYOffset > sticky) {
        header.className = "sticky";
      } else {
        header.className = "";
      }
    }
  };

  return (auth.uid) ? (
    <div className="game-list">
        <div id="game-header-table">
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
      <GameList games={ games } followers={ followers }/>
    </div>
  ): (<div/>);
};

const mapStoreToProps = state => {
  return {
    auth: state.firebase.auth,
    games: state.firestore.ordered.games
  }
};

export default compose(
  connect(mapStoreToProps),
  firestoreConnect([
    { collection: "games", orderBy: ["created"] },
    { collection: "followers" }
  ])
)(GameContainer);
