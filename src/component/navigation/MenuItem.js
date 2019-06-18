import React from "react";
import { Link } from "react-router-dom";

/**
 * Komponent tworzący widok pojedyńczej opcji w menu
 * @param item - Element menu
 * @return {*} - Zwraca widok pojedyńczej opcji w menu
 */
const MenuItem = ({ item }) => {
  return (
    <Link to={ "/" + item.page }>
      <div className="position-in-menu">
        { item.text }
      </div>
    </Link>
  );
};

export default MenuItem;
