import React from "react";
import {Link} from "react-router-dom";

const MenuItem = (props) => {
  const item = props.item;

  return (
    <Link to={"/" + item.page}>
      <div className="position-in-menu">
        {item.text}
      </div>
    </Link>
  );
};

export default MenuItem;
