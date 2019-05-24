import React, { Component } from "react";
import { GameAdd } from "../game";
import { compose } from "redux";
import { firestoreConnect } from "react-redux-firebase";
import { connect } from "react-redux";
import { Link } from "react-router-dom";


/*
* TODO 1 obserwowane gry dla danego użytkownika
* TODO 2 wyszukiwarka gry
* */
class GameSection extends Component {
  state = {
    show: false
  };

  toggleModal = (event) => {
    this.setState({
      show: event.target.dataset.name === "addGame"
    })
  };

  render() {
    const gameList = this.props.followsGame && this.props.followsGame.map(game =>
      this.props.follows && this.props.follows.map(follow =>
        (follow.followThingId === game.id) && <li key={ game.id }>
        <Link to={ `/game/${game.id}` }>{ game.title }</Link>
      </li>));

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
        <div style={{textAlign:"center"}}> Załaduj więcej...</div>
      </div>
    );
  }
}

const mapStoreToProps = state => {
  return {
    followsGame: state.firestore.ordered.followsGame
  }
};

export default compose(
  firestoreConnect([
    {
      collection: "games",
      orderBy: ["title"],
      storeAs: "followsGame"
    }
  ]),
  connect(mapStoreToProps)
)(GameSection);
