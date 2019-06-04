import React from 'react';
import { GameList } from "./";
import { connect } from "react-redux";
import { compose } from "redux";
import { firestoreConnect } from "react-redux-firebase";
import { Redirect } from "react-router-dom";
import Loader from "../dashboard/Loader";

import "./game.css";
import "./game-list.css";
import "./game-responsive.css";

const GameContainer = ({ games, auth, followers }) => {
  return (auth.uid) ? (games ?
    <GameList games={ games } followers={ followers }/>: <Loader />
    ): (<Redirect to="/"/>);
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
