import React from 'react';
// import { Link } from "react-router-dom";
import Search from "../search/Search";

const GameList = ({ games }) => {
  // return (<table className="game-list" cellSpacing="0">
  //   <thead id="game-header-table" style={{width:"100%"}}>
  //   <tr>
  //     <td className="game-search" colSpan="3" >
  //       <input type="text" placeholder="Zacznij pisać, aby wyszukać grę" />
  //     </td>
  //   </tr>
  //   <tr className="game-item">
  //       <td className="title">Nazwa gry</td>
  //       <td className="create-date">Data stworzenia</td>
  //       <td className="author">Nick autora</td>
  //     </tr>
  //   </thead><tbody>
  //   { games && games.map(game => {
  //     return (<tr className="game-element" key={ game.id }>
  //           <td className="title">
  //             <Link to={ "/game/" + game.id }>
  //               { game.title }
  //             </Link>
  //           </td>
  //           <td className="create-date"> { game.created.toDate().toLocaleDateString() }</td>
  //           <td className="author"> { game.authorNick }</td>
  //     </tr>)
  //   })}
  // </tbody></table>);

  return(<Search
  message="game-list"
  collection="games"
  className="game-search"
  placeholder="Zacznij pisać, aby wyszukać grę"
  />)
};

export default GameList;
