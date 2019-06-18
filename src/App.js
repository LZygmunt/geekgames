import React, { Component } from "react";
import {BrowserRouter, Redirect, Route, Switch} from "react-router-dom";
import NavBar from "./component/navigation/NavBar";
import { Event, EventContainer } from "./component/event";
import { ShortInfo } from "./component/dashboard"
import { Profile } from "./component/profile";
import { Game, GameContainer } from "./component/game";
import { compose } from "redux";
import { firebaseConnect } from "react-redux-firebase";
import { connect } from "react-redux";
import Loader from "./component/dashboard/Loader";
import Error404 from "./component/error/Error404";

import logo from "./images/logo.png"
import logoMini from "./images/logo-geek-games.png"

import "./App.css";

class App extends Component {
  render() {

    const { auth } = this.props;

    if(auth.isLoaded) return (
      <BrowserRouter>
        <div className="App" >
          <NavBar imgSrc={ (window.innerWidth <= 580 )? logoMini : logo } altText={ "GeekGames logo" }/>
          <div id="content">
            <ShortInfo />
            <div id="right-side" className={auth.uid ? "": "guest"}>
              <Switch>
                <Route exact path="/" component={ Profile }/>
                <Route exact path="/games" component={ GameContainer }/>
                <Route exact path="/game/:id" component={ Game }/>
                <Route exact path="/events" component={ EventContainer }/>
                <Route exact path="/event/:id" component={ Event }/>
                <Route path="/not_found" component={ Error404 }/>
                <Redirect from="/*" to="/not_found"/>
              </Switch>
            </div>
          </div>
        </div>
      </BrowserRouter>
    );
    return <Loader/>;
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
