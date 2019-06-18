import React from "react";
import { Link } from "react-router-dom";

/**
 * Komponent odpowiadający za widok jednego powiadomienia
 * @param notification - Obiekt zawierający informacje o powiadomieniu
 * @param message - wiadomość o braku powiadomień
 * @returns {*} - Zwraca widok powiadomienia
 */
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
            { msg } <Link to={`/${ collection }/${ notification.objectId }`} >
              "{ notification.objectTitle }"
            </Link> { notification.content }
          </p>
      }
    </div>
  )
};

export default Notifications;
