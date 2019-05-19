import React from "react";
import { EventSection, PersonalDataSection, GameSection, SignUp, SignIn} from "./";
import { connect } from "react-redux";

import logoSeparator from "./../../images/logo-geek-games.png"

import "./profil.css";
import "./event-section.css";
import "./games-section.css";

const Profile = props => {
  const { auth, game, post } = props;

  return (auth.uid) ?
    (<div style={{width:"70%"}}>
        <PersonalDataSection auth={ auth }/>
        <EventSection event={ post }/>
        <GameSection game={ game }/>
    </div>):
    (<div className="registry">
        <SignIn />
        <div id="separator" >
            <div className="up"/>
            <img src={ logoSeparator } alt="geek-games"/>
            <div className="bottom"/>
        </div>
        <SignUp />
    </div>);
};

const mapStateToProps = state => {
  return {
    auth: state.firebase.auth,
    posts: state.firestore.ordered.post,
    games: state.firestore.ordered.games
  }
};

export default connect(mapStateToProps)(Profile);
