import React from "react";
import { Link } from "react-router-dom";

const Notifications = ({ notification, message }) => {
  let msg, collection;
  switch (notification && notification.message) {
    case "games":
      msg = "Gra";
      collection = notification.message.slice(0, -1);
      break;
    case "events":
      msg = "Wydarzenie";
      collection = notification.message.slice(0, -1);
      break;
    case "posts":
      msg = "Do gry";
      collection = "game";
      break;
    case "comments":
      msg = "Do wydarzenia";
      collection = "event";
      break;
    default:
      break;
  }
  
  return (
    <div className="notification">
      {
        message ?
          <p> { message }</p>:
          <p>
            { msg }&nbsp;
            <Link to={`/${ collection }/${ notification.objectId }`}>
              "{ notification.objectTitle }"
            </Link>&nbsp;
            { notification.content }
          </p>
      }
    </div>
  )
};

export default Notifications;
