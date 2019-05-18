import React, { Component } from "react";
import { BrowserRouter, Route } from "react-router-dom";
import NavBar from "./component/navigation/NavBar";
import { Event, EventMiniList } from "./component/event";
import Profile from "./component/profile/Profile";
import Game from "./component/game/Game";

import logo from "./images/logo.png"

import "./App.css";

class App extends Component {
  render() {//TODO ożywić wszystkie guziki
    return (
      <BrowserRouter>
        <div className="App">
          <NavBar imgSrc={logo} altText={"GeekGames logo"}/>
          <div id="content">
            <EventMiniList />
            <Route exact path="/" component={Profile}/>
            <Route path="/games" component={Game}/>
            <Route path="/events" component={Event}/>
          </div>
        </div>
      </BrowserRouter>
    );
  }
}

export default App;
