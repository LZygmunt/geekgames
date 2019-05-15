import React, {Component} from "react";

import "./game.css"
import PostContainer from "../post/PostContainer";
import logo from "./../../images/logo-geek-games.png";
import EventAdd from "../event/EventAdd";
import {connect} from "react-redux";
import { Redirect } from "react-router-dom";

class Game extends Component {

  state = {
    show: false
  };

  toggleModal = (event) => {
    this.setState({
      show: event.target.dataset.name === "add"
    })
  };

  render() {
    const props = {
      imgUrl: logo,
      alt: "logo",
      gameTitle: "Makao",
      follow: true,
      gameDesc: "Lorem ipsum dolor sit amet, consectetur adipisicing elit. A, ad beatae debitis, doloremque hic in,\n" +
        "                incidunt magnam nemo quidem reiciendis rerum sint tempora voluptas? Accusamus cupiditate facere quo quod\n" +
        "                repellat!Lorem ipsum dolor sit amet, consectetur adipisicing elit. A, ad beatae debitis, doloremque hic in,\n" +
        "                incidunt magnam nemo quidem reiciendis rerum sint tempora voluptas? Accusamus cupiditate facere quo quod\n" +
        "                repellat!Lorem ipsum dolor sit amet, consectetur adipisicing elit. A, ad beatae debitis, doloremque hic in,\n" +
        "                incidunt magnam nemo quidem reiciendis rerum sint tempora voluptas? Accusamus cupiditate facere quo quod\n" +
        "                repellat!Lorem ipsum dolor sit amet, consectetur adipisicing elit. A, ad beatae debitis, doloremque hic in,\n" +
        "                incidunt magnam nemo quidem reiciendis rerum sint tempora voluptas? Accusamus cupiditate facere quo quod\n" +
        "                repellat!Lorem ipsum dolor sit amet, consectetur adipisicing elit. A, ad beatae debitis, doloremque hic in,\n" +
        "                incidunt magnam nemo quidem reiciendis rerum sint tempora voluptas? Accusamus cupiditate facere quo quod\n" +
        "                repellat!Lorem ipsum dolor sit amet, consectetur adipisicing elit. A, ad beatae debitis, doloremque hic in,\n" +
        "                incidunt magnam nemo quidem reiciendis rerum sint tempora voluptas? Accusamus cupiditate facere quo quod\n" +
        "                repellat!Lorem ipsum dolor sit amet, consectetur adipisicing elit. A, ad beatae debitis, doloremque hic in,\n" +
        "                incidunt magnam nemo quidem reiciendis rerum sint tempora voluptas? Accusamus cupiditate facere quo quod\n" +
        "                repellat!"
    };

    const { auth, games } = this.props;

    return (auth.uid) ?
      (<div id="game">
        <div className="game-property">
          <img
            className="game-photo"
            src={props.imgUrl}
            alt={props.alt}
          />

          <div className="game-info">
            <h1 className="title">{props.gameTitle}</h1>
            <button className="follow-button ">
              <i className="fas fa-plus"> </i>
              <span>{props.follow ? "Nie obserwuj" : "Obserwuj"}</span>
            </button>
            <div className="add-button" data-name="add" onClick={this.toggleModal}>
              <i className="fas fa-plus" data-name="add"> </i>
              <span data-name="add"> Dodaj wydarzenie</span>
            </div>
          </div>
        </div>
        <div className="game-desc">
          <p>{props.gameDesc}</p>
        </div>
        <PostContainer/>
        <EventAdd show={this.state.show} handleClose={this.toggleModal}/>
      </div>) :
      (<Redirect to="/"/>);
  }
}

const mapStateToProps = (state) => {
  // console.log(state);
  return {
    auth: state.firebase.auth,
    // auth: {uid: 1},
    games: state.firestore.ordered.games
  }
};

export default connect(mapStateToProps)(Game);
