import React from 'react';
import { GameList } from "./";
import { connect } from "react-redux";
import { compose } from "redux";
import { firestoreConnect } from "react-redux-firebase";
import { Redirect } from "react-router-dom";

import "./game.css";
import "./game-list.css";
import "./game-responsive.css";

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

  return (auth.uid) ? (<GameList games={ games } followers={ followers }/>): (<Redirect to="/"/>);
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
