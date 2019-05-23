import React from 'react';
import { Link } from "react-router-dom";

const EventList = ({ events }) => {
  return (<div className="game-list">
    <div id="game-header-table" style={{width:"100%"}}>
      <div className="game-search">
        <input type="text" placeholder="Zacznij pisać, aby wyszukać grę" />
      </div>
      <div className="game-item">
        <div className="title">Nazwa wydarzenia</div>
        <div className="place">Miejsce</div>
        <div className="game-title">Nazwa gry</div>
        <div className="start-date">Data rozpoczęcia</div>
        <div className="author">Nick autora</div>
        <div className="num-of-user">Obserwujący</div>
      </div>
    </div>
    { events && events.map(event => {
      return (<div className="game-element" key={ event.id }>
        <Link to={ "/event/" + event.id }>
          <div className="game-item">
            <div className="title"> { event.title } </div>
            <div className="place"> {event.place} </div>
            <div className="game-title">{ event.gameTitle }</div>
            <div className="start-date"> {event.startDate}</div>
            <div className="author"> { event.authorNick }</div>
            <div className="num-of-user">
              <i className="far fa-user-circle"/>
              <i className="far fa-user-circle"/>
              <i className="far fa-user-circle"/>
              <p className="num-of-user-more"> +5</p>
            </div>
          </div>
        </Link>
      </div>)
  })}
  </div>);
};

export default EventList;
