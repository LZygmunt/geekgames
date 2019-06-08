import React from "react";
import { Link } from "react-router-dom";

const Notifications = ({ message }) => {
  return (
    <div className="notification">
      <p>{ message }</p>
    </div>
  )
};

export default Notifications;
