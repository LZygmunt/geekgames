import React from "react";
import { EventSection, PersonalDataSection, GameSection, SignUp, SignIn} from "./";
import { connect } from "react-redux";
import { compose } from "redux";
import { firestoreConnect } from "react-redux-firebase";

import logoSeparator from "./../../images/logo-geek-games.png"

import "./profil.css";
import "./event-section.css";
import "./games-section.css";
import "./profil-responsive.css";

const Profile = props => {
  const { auth, follows } = props;
 //TODO Sprawdzanie hasła oraz czyszczenie state
  return (auth.uid) ?
    (<div style={{width:"70%"}}>
        <PersonalDataSection auth={ auth }/>
        <EventSection follows={ follows }/>
        <GameSection follows={ follows }/>
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
    follows: state.firestore.ordered.follows
  }
};

export default compose(
  firestoreConnect(props => [
    {
      collection: "followers",
      where: ["authorId", "==", props.firebase._.authUid],
      storeAs: "follows"
    }
  ]),
  connect(mapStateToProps)
)(Profile);
