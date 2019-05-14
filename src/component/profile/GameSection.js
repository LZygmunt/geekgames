import React, {Component} from "react";
import GameAdd from "../game/GameAdd";

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
      show: event.target.name === "addGame"
    })
  };

  render() {
    const gameList = this.state.games.map((item, index) => <li key={index}>{item.title}</li>);

    return (
      <div className="game-section">
        <div className="game-header">
          <h1>Wydarzenia w których bierzesz udział:</h1>
          <button name="addGame"onClick={this.toggleModal}>
            <i className="fas fa-plus"> </i>
            <span>Dodaj grę</span>
          </button>
        </div>
        <div className="game-search">
          <input type="text" placeholder="Zacznij pisać, aby wyszukać grę" />
        </div>
        <GameAdd show={this.state.show} handleClose={this.toggleModal}/>
        <ul>
          {gameList}
        </ul>
      </div>
    );
  }
}

export default GameSection;
