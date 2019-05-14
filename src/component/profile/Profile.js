import React from "react";
import PersonalDataSection from "./PersonalDataSection";
import EventSection from "./EventSection";
import GameSection from "./GameSection";

import "./profil.css"
import "./event-section.css"
import "./games-section.css"

const Profile = () => {
  return(
    <div style={{width:"70%"}}>
        <PersonalDataSection/>
        <EventSection />
      <h1>Gry, które obserwujesz:</h1>
        <GameSection />
    </div>
  );
};

export default Profile;
