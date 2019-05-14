import React from "react";
import PersonalDataSection from "./PersonalDataSection";
import EventSection from "./EventSection";
import GameSection from "./GameSection";

import "./profil.css"
import "./event-section.css"
import "./games-section.css"

const Profile = () => {
  //todo zrobić szukajki
  return(
    <div style={{width:"70%"}}>
        <PersonalDataSection/>
        <EventSection />
        <GameSection />
    </div>
  );
};

export default Profile;
