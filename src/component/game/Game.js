import React, { Component } from "react";
import { PostContainer, PostAdd } from "../post";
import { EventAdd } from "../event";
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";
import { firestoreConnect } from "react-redux-firebase";
import { compose } from "redux";
import { followGame, unfollowGame } from "../../store/actions/gameActions";

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

  followIt = () => {
    (this.props.follow.length) ?
      this.props.unfollowGame(this.props.follow[0].id):
      this.props.followGame(this.props.match.params.id);
  };

  render() {
    const { auth, post, match, follow } = this.props;
    const game = this.props.game && this.props.game[match.params.id];
    console.log(follow)
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

              <div className="follow-button slide-button" onClick={ this.followIt }>
                <i className={ follow && (follow.length ? "fas fa-eye-slash": "fas fa-eye") }/>
                <span>{ follow && (follow.length ? "Nie obserwuj" : "Obserwuj") }</span>
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
          <EventAdd
            show={ this.state.show }
            handleClose={ this.toggleModal }
            game={{ gameId: match.params.id, gameTitle: game.title }}
          />
        </div>) : (<div>Ładowanie gry...</div>)
      ) :
      (<Redirect to="/"/>);
  }
}

const mapStoreToProps = state => {
  const emf = state.firestore.ordered.eventMiniFollowers;
  const g = state.firestore.ordered.games;

  return {
    auth: state.firebase.auth,
    game: state.firestore.data.games,
    post: state.firestore.ordered.posts,
    follow: emf && emf.filter(follow => g && follow.followThingId === g[0].id && follow)
      .filter(follow => follow.authorId === state.firebase.auth.uid)
  }
};

const mapDispatchToProps = dispatch => {
  return {
    followGame: follow => dispatch(followGame(follow)),
    unfollowGame: follow => dispatch(unfollowGame(follow))
  }
};

export default compose(
  firestoreConnect(props => [
    { collection: "games", doc: props.match.params.id },
    { collection: "posts", where: ["gameId", "==", props.match.params.id] }
  ]),
  connect(mapStoreToProps,mapDispatchToProps)
)(Game);
