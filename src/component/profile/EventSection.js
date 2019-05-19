import React, { Component } from "react";

/*
* TODO 1 obserwowane wydarzenia dla danego użytkownika
* TODO 2 wyszukiwarka wydarzeń obesrowanych
* */

class EventSection extends Component {
  state = {
    show: false,
    events: [
      {
        title: "Zabierz swoją talię. Zabierz swoją talię. Zabierz swoją talię.",
        place: "Rzeszów",
        date: "2019-12-24"
      },
      {
        title: "Kim jest twój król trefl",
        place: "Krosno",
        date: "2019-11-25"
      },
      {
        title: "Wspólna gra w parku",
        place: "Rzeszów",
        date: "2019-11-25"
      },
      {
        title: "Zabierz swoją talię",
        place: "Rzeszów",
        date: "2019-12-24"
      },
      {
        title: "Kim jest twój król trefl",
        place: "Krosno",
        date: "2019-11-25"
      },
      {
        title: "Anonimowi gracze",
        place: "Rzeszów",
        date: "2019-08-21"
      }
    ]
  };

  render() {
    const eventList = this.state.events.map((item, index) => <li key={ index }>
      <span>{ item.title }</span>
      <span>{ item.place }</span>
      <span>{ item.date }</span>
    </li>);

    return (
      <div className="event-section">
        <div className="event-search">
          <h1>Obserwowane wydarzenia:</h1>
          <input type="text" placeholder="Zacznij pisać, aby wyszukać wydarzenie"/>
        </div>
        <ul>
          { eventList }
        </ul>
      </div>
    );
  }
}

export default EventSection;
