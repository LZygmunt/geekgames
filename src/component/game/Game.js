import React, { Component } from "react";
import { PostContainer, PostAdd } from "../post";
import { EventAdd } from "../event";
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";
import { firestoreConnect } from "react-redux-firebase";
import { compose } from "redux";

import logo from "./../../images/logo-geek-games.png";

class Game extends Component {

  state = {
    show: false,
    imgUrl: logo,
  };

  toggleModal = event => {
    this.setState({
      show: event.target.dataset.name === "add"
    })
  };

  render() {
    const { auth, post, match } = this.props;
    const game = this.props.game && this.props.game[this.props.match.params.id];
    const followers = { follow: false };

    return (auth.uid) ? (
        (game) ? (<div id="game">
          <div className="game-property">
            <img
              className="game-photo"
              src={ (game.image === "") ? this.state.imgUrl : game.image }
              alt={ game.alt }
            />

            <div className="game-info">
              <h1 className="title">{ game.title }</h1>
              <div className="follow-button slide-button">
                <i className="fas fa-eye-slash"/>
                <span>{ followers.follow ? "Nie obserwuj" : "Obserwuj" }</span>
              </div>
              <div className="add-button slide-button" data-name="add" onClick={ this.toggleModal }>
                <i className="fas fa-plus" data-name="add"> </i>
                <span data-name="add"> Dodaj wydarzenie</span>
              </div>
            </div>
          </div>
          <div className="game-desc">
            <p>{ game.desc }</p>
          </div>
          <PostAdd gameId={ match.params.id }/>
          <PostContainer posts={ post }/>
          <EventAdd show={ this.state.show } handleClose={ this.toggleModal } gameId={ match.params.id }/>
        </div>) : (<div>Ładowanie gry...</div>)
      ) :
      (<Redirect to="/"/>);
  }
}

const mapStateToProps = state => {
  return {
    auth: state.firebase.auth,
    game: state.firestore.data.games,
    post: state.firestore.ordered.posts
    // follow: state.firebase.ordered.follower
  }
};

export default compose(
  firestoreConnect(props => [
    { collection: "games", doc: props.match.params.id },
    { collection: "posts", where: ["gameId", "==", props.match.params.id] }
  ]),
  connect(mapStateToProps)
)(Game);
