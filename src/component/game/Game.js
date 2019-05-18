import React, {Component} from "react";
import { PostContainer, PostAdd } from "../post";
import logo from "./../../images/logo-geek-games.png";
import { EventAdd } from "../event";
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";
import { firestoreConnect } from "react-redux-firebase";
import { compose } from "redux";

class Game extends Component {

  state = {
    show: false,
    imgUrl: logo,
  };

  toggleModal = (event) => {
    this.setState({
      show: event.target.dataset.name === "add"
    })
  };

  render() {
    const { auth, game } = this.props;
    const followers = { follow: false };

    // console.log(this.props.post)

    const p = {
      gameTitle: game ? game.title: "",
      gameId: this.props.match.params.id
    };
    //TODO zrobić tworzenie wpisu

    // console.log("Game log props -> ", this.props.post );
    return (auth.uid) ? (
      (game) ? (<div id="game">
        <div className="game-property">
          <img
            className="game-photo"
            src={(game.image === "") ? this.state.imgUrl: game.image}
            alt={game.alt}
          />

          <div className="game-info">
            <h1 className="title">{game.title}</h1>
            <div className="follow-button slide-button">
              <i className="fas fa-eye-slash"/>
              <span>{followers.follow ? "Nie obserwuj" : "Obserwuj"}</span>
            </div>
            <div className="add-button slide-button" data-name="add" onClick={this.toggleModal}>
              <i className="fas fa-plus" data-name="add"> </i>
              <span data-name="add"> Dodaj wydarzenie</span>
            </div>
          </div>
        </div>
        <div className="game-desc">
          <p>{game.desc}</p>
        </div>
        <PostAdd gameId={this.props.match.params.id}/>
        <PostContainer posts={this.props.post} p={p}/>
        <EventAdd show={this.state.show} handleClose={this.toggleModal}/>
      </div>) : ( <div>Ładowanie gry...</div>)
      ):
      (<Redirect to="/"/>);
  }
}

const mapStateToProps = (state, ownProps) => {
  const id = ownProps.match.params.id;
  // console.log("d => ", id)
  const games = state.firestore.data.games;
  const game = games ? games[id]: null;
  // console.log("Game log -> ",state.firestore.data.games);
  return {
    auth: state.firebase.auth,
    game: game,
    post: state.firestore.ordered.posts
    // follow: state.firebase.ordered.follower
  }
};

export default compose(
  firestoreConnect((props) => [
    {collection: "games"},
    {collection: "posts", where: ["gameId", "==", props.match.params.id]}
  ]),
  connect(mapStateToProps)
)(Game);
