import React, {Component} from "react";
import {GameAdd} from "../game";
import Search from "../search/Search";


class GameSection extends Component {
  state = {
    show: false,
    search: ""
  };

  toggleModal = event => {
    this.setState({
      show: event.target.dataset.name === "addGame"
    })
  };


  render() {
    return (
      <div className="game-section">
        <div className="game-header">
          <h1>Obserwowane gry:</h1>
          <div className="slide-button" data-name="addGame" onClick={this.toggleModal}
               style={{whiteSpace: "nowrap", padding: "5px 10px"}}>
            <i className="fas fa-plus" data-name="addGame"> </i>
            <span data-name="addGame">Dodaj grę</span>
          </div>
        </div>
        <Search
          message="games"
          collection="followers"
          className="game-search"
          placeholder="Zacznij pisać, aby wyszukać grę"
          followerId={ this.props.followerId }
        />
        <GameAdd show={this.state.show} handleClose={this.toggleModal}/>
      </div>
    );
  }
}

export default GameSection;
