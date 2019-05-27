import React, { Component } from "react";
import { GameAdd } from "../game";
import { compose } from "redux";
import { firestoreConnect } from "react-redux-firebase";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import Search from "../search/Search";


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
    const followsMap = this.props.follows && this.props.follows.map(follow => follow.followThingId);
    const gameList = (this.props.followsGame && followsMap) ?
      this.props.followsGame
        .filter(game => followsMap.includes(game.id))
        .map(game => <li key={ game.id }>
               <Link to={ `/game/${ game.id }` }>{ game.title }</Link>
             </li>):
      null;
    // const searchList = this.props.followsGame &&

    return (
      <div className="game-section">
        <div className="game-header">
          <h1>Obserwowane gry:</h1>
          <div className="slide-button" data-name="addGame" onClick={this.toggleModal} style={{ whiteSpace: "nowrap",padding: "5px 10px" }}>
            <i className="fas fa-plus" data-name="addGame"> </i>
            <span data-name="addGame">Dodaj grę</span>
          </div>
        </div>
        <Search collection="games" sort="titleToLowerCase" className="game-search"/>
        {/*<div className="game-search">*/}
        {/*  <input*/}
        {/*    type="text"*/}
        {/*    name="search"*/}
        {/*    placeholder="Zacznij pisać, aby wyszukać grę"*/}
        {/*    value={ this.state.search }*/}
        {/*    onChange={ this.updateSearch }*/}
        {/*  />*/}
        {/*</div>*/}
        <GameAdd show={ this.state.show } handleClose={ this.toggleModal }/>
        <ul>
          { gameList }
        </ul>
        { gameList && gameList.length > 15 && <div style={{textAlign:"center"}}> Załaduj więcej...</div> }
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
