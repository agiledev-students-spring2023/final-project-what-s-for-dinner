import React from "react";
import { Link } from "react-router-dom";
import "./Welcome.css";

const Welcome = (props) => {
  return (
    <div className="Welcome">
      <h1>Welcome!</h1>
      <section className="main-content">
        <p>
          "What's for Dinner" is an open-source web application that
          suggests recipes based on the ingredients and cooking utensils
          you have on hand.
          With our platform, you can search for recipes using specific ingredients,
          add or remove ingredients to see different recipe suggestions,
          and save your favorite recipes for future use.
          Our app also includes advanced search filters such as
          dietary restrictions, meal type, and cooking time/difficulty
          to help find the perfect recipe for users at all levels.
        </p>
        <div className="links">
          <Link to="/recipes">Check out our recipes!</Link>
          <h1>
            <Link to="/home">Click Here to Start</Link>
          </h1>
        </div>
      </section>
    </div>
  );
};

export default Welcome;
