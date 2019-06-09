import React from "react";
import { EventSection, PersonalDataSection, GameSection, SignUp, SignIn} from "./";
import { connect } from "react-redux";
import Loader from "../dashboard/Loader";

import logoSeparator from "./../../images/logo-geek-games.png"

import "./profil.css";
import "./event-section.css";
import "./games-section.css";
import "./profil-responsive.css";

const Profile = props => {
  const { auth } = props;

  return (auth) ? ((auth.uid) ?
    (<div>
        <PersonalDataSection auth={ auth }/>
        <EventSection followerId={ auth.uid }/>
        <GameSection followerId={ auth.uid }/>
    </div>):
    (<div className="registry">
        <SignIn />
        <div id="separator" >
            <div className="up"/>
            <img src={ logoSeparator } alt="geek-games"/>
            <div className="bottom"/>
        </div>
        <SignUp />
    </div>)) : <Loader />;
};

const mapStateToProps = state => {
  return {
    auth: state.firebase.auth
  }
};

export default connect(mapStateToProps)(Profile);
