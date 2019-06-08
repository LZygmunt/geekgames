import React, {Component} from "react";
import {GameAdd} from "../game";
import {compose} from "redux";
import {firestoreConnect} from "react-redux-firebase";
import {connect} from "react-redux";
import {Link} from "react-router-dom";
import Search from "../search/Search";
// import {getList} from "../../store/actions/gameActions";


/*
* TODO 2 wyszukiwarka gry
* */
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

  updateSearch = event => {
    this.setState({
      search: event.target.name.value
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
        />
        <GameAdd show={this.state.show} handleClose={this.toggleModal}/>
      </div>
    );
  }
}

export default GameSection;
