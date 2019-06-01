import React from "react";
import { EventMiniList, NotificationsList } from "./";
import {connect} from "react-redux";

const ShortInfo = ({auth}) => {

    window.onscroll = function(){
        const leftSide = document.getElementById("fixed");
        if (leftSide != null){
            const sticky = 80;

            if (window.pageYOffset > sticky) {
                leftSide.style.position = "fixed";
                leftSide.style.top="110px";
            } else {
                leftSide.style.position  = "relative";
                leftSide.style.top="0";
            }

        }
    };


  return (auth.uid) ?
    (<div id="slide-event" style={{display:"block"}}>
        <div id="fixed">
      <NotificationsList />
      <EventMiniList />
        </div>
    </div>) : null
};

const mapStoreToProps = state => {
  return {
    auth: state.firebase.auth
  }
};

export default connect(mapStoreToProps)(ShortInfo);
