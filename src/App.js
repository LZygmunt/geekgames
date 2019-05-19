import React, { Component } from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import NavBar from "./component/navigation/NavBar";
import { Event, EventContainer, EventMiniList } from "./component/event";
import { Profile } from "./component/profile";
import { Game, GameContainer } from "./component/game";
import { compose } from "redux";
import { firebaseConnect } from "react-redux-firebase";
import { connect } from "react-redux";

import logo from "./images/logo.png"

import "./App.css";

class App extends Component {
  render() {//TODO ożywić wszystkie guziki
    const { auth } = this.props;

    if(auth.isLoaded) return (
      <BrowserRouter>
        <div className="App">
          <NavBar imgSrc={ logo } altText={ "GeekGames logo" }/>
          <div id="content">
            <EventMiniList />
            <Switch>
              <Route exact path="/" component={ Profile }/>
              <Route path="/games" component={ GameContainer }/>
              <Route path="/game/:id" component={ Game }/>
              <Route path="/events" component={ EventContainer }/>
              <Route path="/event/:id" component={ Event }/>
            </Switch>
          </div>
        </div>
      </BrowserRouter>
    );
    return null;
  }
}

const mapStateToProps = (state) => {
  // console.log(state)
  return {
    auth: state.firebase.auth
  }
};

export default compose(
  firebaseConnect(),
  connect(mapStateToProps)
)(App);
