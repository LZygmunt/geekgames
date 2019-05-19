import React, { Component } from "react";
import { GameAdd } from "../game";


/*
* TODO 1 obserwowane gry dla danego użytkownika
* TODO 2 wyszukiwarka gry
* */
class GameSection extends Component {

  state = {
    show: false,
    games: [
      { title:"Makao"},
      { title:"Poker"},
      { title:"Assasin Creed II"},
      { title:"Wiedźmin"},
      { title:"Wiedźmin II"},
      { title:"Wiedźmin III"},
      { title:"The Sims 4"},
      { title:"Fifa 19"},
      { title:"Dark Souls"},
      { title:"Dark Souls II"},
      { title:"Dark Souls III"},
      { title:"Makao"},
      { title:"Poker"},
      { title:"Assasin Creed II"},
      { title:"Wiedźmin"},
      { title:"Wiedźmin II"},
      { title:"Wiedźmin III"},
      { title:"The Sims 4"},
      { title:"Fifa 19"},
      { title:"Dark Souls"},
      { title:"Dark Souls II"},
      { title:"Dark Souls III"},
      { title:"Makao"},
      { title:"Poker"},
      { title:"Assasin Creed II"},
      { title:"Wiedźmin"},
      { title:"Wiedźmin II"},
      { title:"Wiedźmin III"},
      { title:"The Sims 4"},
      { title:"Fifa 19"},
      { title:"Dark Souls"},
      { title:"Dark Souls II"},
      { title:"Dark Souls III"}
    ]
  };

  componentDidMount() {
    //TODO ściągnij dane
  }

  toggleModal = (event) => {
    this.setState({
      show: event.target.dataset.name === "addGame"
    })
  };

  render() {
    const gameList = this.state.games.map((item, index) => <li key={ index }>{ item.title }</li>);

    return (
      <div className="game-section">
        <div className="game-header">
          <h1>Obserwowane gry:</h1>
          <div className="slide-button" data-name="addGame" onClick={this.toggleModal} style={{ whiteSpace: "nowrap",padding: "5px 10px" }}>
            <i className="fas fa-plus" data-name="addGame"> </i>
            <span data-name="addGame">Dodaj grę</span>
          </div>
        </div>
        <div className="game-search">
          <input type="text" placeholder="Zacznij pisać, aby wyszukać grę" />
        </div>
        <GameAdd show={ this.state.show } handleClose={ this.toggleModal }/>
        <ul>
          { gameList }
        </ul>
      </div>
    );
  }
}

export default GameSection;
