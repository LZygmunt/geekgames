import React from 'react';
import { Link } from "react-router-dom";

const EventList = ({ events }) => {
  //TODO ilość obserwujących
  return (<table className="game-list" cellSpacing="0">
    <thead id="game-header-table" style={{width:"100%"}}>
      <tr><td className="game-search" colSpan="5" >
        <input type="text" placeholder="Zacznij pisać, aby wyszukać grę" />
      </td>
      </tr>
      <tr className="game-item">
        <td className="title">Nazwa wydarzenia</td>
        <td className="place">Miejsce</td>
        <td className="game-title">Nazwa gry</td>
        <td className="start-date">Data rozpoczęcia</td>
        <td className="author">Nick autora</td>
      </tr>
    </thead><tbody>
    { events && events.map(event => {
      return (<tr className="game-element" key={ event.id }>

            <td className="title"><Link to={ "/event/" + event.id }> { event.title }</Link> </td>
            <td className="place"> {event.place} </td>
            <td className="game-title">{ event.gameTitle }</td>
            <td className="start-date"> {event.startDate}</td>
            <td className="author"> { event.authorNick }</td>
      </tr>)
  })}
  </tbody></table>);
};

export default EventList;
