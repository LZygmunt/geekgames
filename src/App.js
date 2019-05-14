import React, { Component } from "react";
import { BrowserRouter, Route } from "react-router-dom";
import NavBar from "./component/navigation/NavBar";
import { Event, EventMini } from "./component/event";
import Profile from "./component/profile/Profile";
import Game from "./component/game/Game";

import logo from "./images/logo.png"

import "./App.css";

class App extends Component {
  render() {
    const data = [
      {
        id: 0,
        dateOfEvent: "2012-05-29",
        placeOfEvent: "Place",
        gameOfEvent: "Go to page game",
        titleOfEvent: "Title of event... Go to page event",
        isFollow: true
      },
      {
        id: 1,
        dateOfEvent: "2000-10-02",
        placeOfEvent: "Place",
        gameOfEvent: "Go to page game",
        titleOfEvent: "Title of event... Go to page event",
        isFollow: false
      },
      {
        id: 2,
        dateOfEvent: "1000-10-01",
        placeOfEvent: "Place",
        gameOfEvent: "Go to page game",
        titleOfEvent: "Title of event... Go to page event",
        isFollow: false
      },
      {
        id: 3,
        dateOfEvent: "1000-10-01",
        placeOfEvent: "Place",
        gameOfEvent: "Go to page game",
        titleOfEvent: "Title of event... Go to page event",
        isFollow: true
      }
    ];

    const eventList = data.map(item => <EventMini key={item.id} item={item}/>);

    return (
      <BrowserRouter>
        <div className="App">
          <NavBar imgSrc={logo} altText={"GeekGames logo"}/>
          <div id="content">
            <div id="slide-event">
              {eventList}
            </div>

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
