import React, { Component } from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import NavBar from "./component/navigation/NavBar";
import { Event, EventContainer } from "./component/event";
import { ShortInfo } from "./component/dashboard"
import { Profile } from "./component/profile";
import { Game, GameContainer } from "./component/game";
import { compose } from "redux";
import { firebaseConnect } from "react-redux-firebase";
import { connect } from "react-redux";

import logo from "./images/logo.png"
import logoMini from "./images/logo-geek-games.png"

import "./App.css";

class App extends Component {
  render() {
    //TODO ożywić wszystkie guziki
    //TODO Wprowadzić system powiadomień
    //TODO po wysyłaniu formularzy wymazywać ich stan



    //todo Madziu -  ustawić sety dla poszczególnych zestawów

    //todo wprowadzenie loadera

    const { auth } = this.props;

    if(auth.isLoaded) return (
      <BrowserRouter>
        <div className="App" >
          <NavBar imgSrc={ (window.innerWidth <= 580 )? logoMini : logo } altText={ "GeekGames logo" }/>
          <div id="content">
            <ShortInfo />
            <div id="right-side">
            <Switch>
              <Route exact path="/" component={ Profile }/>
              <Route path="/games" component={ GameContainer }/>
              <Route path="/game/:id" component={ Game }/>
              <Route path="/events" component={ EventContainer }/>
              <Route path="/event/:id" component={ Event }/>
            </Switch>
            </div>
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
