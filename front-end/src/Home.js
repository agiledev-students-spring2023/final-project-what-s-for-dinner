import React from "react"
import { Link } from "react-router-dom"
// import logo from './logo.svg';
import "./Home.css"

const Home = props => {
  return (
    <div className="Home">
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
          <br />
          <br />
          <Link to="/recipes">Check out our recipes!</Link>
        </p>
      </section>
    </div>
  )
}

export default Home