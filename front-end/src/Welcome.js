import React from "react";
import { Link } from "react-router-dom";
import "./Welcome.css";

const Welcome = (props) => {
  return (
    <div className="Welcome">
      <h1>Welcome!</h1>
      <section className="main-content">
        <p>
        Welcome to "What's for Dinner", the ultimate solution for your meal planning needs. <br></br>
        Our open-source web application provides personalized recipe suggestions based on the ingredients you have on hand. 
        With our user-friendly platform, you can easily search for recipes, add or remove ingredients to find new and exciting dishes, and save your favorite recipes for future reference. 
        Our advanced search filters make it easy to find recipes that fit your dietary restrictions, meal type, and cooking time/difficulty, making meal planning a breeze for users of all skill levels.
        </p>
        <h2>
        <Link to="/search">Check out our recipes!</Link>
        </h2>
        <h1>
        <Link to="/home">Login for Customized Recipes</Link>
        </h1>
      </section>
    </div>
  );
};

export default Welcome;
