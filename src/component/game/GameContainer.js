import React from 'react';
import { GameList } from "./";
import { connect } from "react-redux";
import { compose } from "redux";
import { firestoreConnect } from "react-redux-firebase";

import "./game.css"

const GameContainer = ({ games, auth, followers }) => {
  console.log(games);
  return (auth.uid) ? (
    <GameList games={games} followers={followers}/>
  ): (<div/>);
};

const mapStoreToProps = (state) => {
  console.log("state ordered -> ", state.firestore)
  return {
    auth: state.firebase.auth,
    games: state.firestore.ordered.games
  }
};

export default compose(
  connect(mapStoreToProps),
  firestoreConnect([
    {collection: "games", orderBy: ["created"]},
    {collection: "followers"}
  ])
)(GameContainer);
