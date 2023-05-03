import React from "react";
import { Link } from "react-router-dom";
import "./PrimaryNav.css";

const PrimaryNav = (props) => {
  const isLoggedIn = props.user && props.user.success;

  return (
    <header>
      <nav>
        <ul className="nav-links">
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to="/recipes">Recipes</Link>
          </li>
          <li>
            <Link to="/search">Search</Link>
          </li>
          <li>
            {isLoggedIn ? (
              <Link to="/logout">Log Out</Link>
            ) : (
              <Link to="/login">Log In</Link>
            )}
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default PrimaryNav;
