import React from "react";
import { Link } from "react-router-dom";

const Menu = () => (
  <div className="Menu">
    <h1>Chose Level:</h1>

    <Link to={{ pathname: "/game", state: { level: "easy" } }}>Easy</Link>
    <Link to={{ pathname: "/game", state: { level: "medium" } }}>Medium</Link>
    <Link to={{ pathname: "/game", state: { level: "difficult" } }}>
      Difficult
    </Link>
    <Link to={{ pathname: "/game", state: { level: "pro" } }}>Pro</Link>
    <Link to={{ pathname: "/game", state: { level: "impossible" } }}>
      Impossible
    </Link>
  </div>
);

export default Menu;
