import React, {Component} from "react";
import { PostContainer, PostAdd } from "../post";
import logo from "./../../images/logo-geek-games.png";
import { EventAdd } from "../event";
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";

import "./game.css"

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

    //TODO zrobić tworzenie wpisu

    //console.log("Game log props -> ",this.props);
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
            <div className="follow-button slide-button">
              <i className="fas fa-eye-slash"/>
              <span>{props.follow ? "Nie obserwuj" : "Obserwuj"}</span>
            </div>
            <div className="add-button slide-button" data-name="add" onClick={this.toggleModal}>
              <i className="fas fa-plus" data-name="add"> </i>
              <span data-name="add"> Dodaj wydarzenie</span>
            </div>
          </div>
        </div>
        <div className="game-desc">
          <p>{props.gameDesc}</p>
        </div>
        <PostAdd />
        <PostContainer/>
        <PostContainer/>
        <EventAdd show={this.state.show} handleClose={this.toggleModal}/>
      </div>) :
      (<Redirect to="/"/>);
  }
}

const mapStateToProps = (state) => {
  // console.log("Game log -> ",state);
  return {
    auth: state.firebase.auth,
    games: state.firestore.ordered.games,
    tester: "hhha czy jest wszędzie?"
  }
};

export default connect(mapStateToProps)(Game);
