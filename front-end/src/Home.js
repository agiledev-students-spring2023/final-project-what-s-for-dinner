import React, { useState, useEffect } from 'react';
import { Link, Navigate } from 'react-router-dom';
import axios from "axios";
import './Home.css';

const Home = (props) => {

  const [recommendedRecipes, setRecommendedRecipes] = useState([]);

  useEffect(() => {
    axios.get("https://www.themealdb.com/api/json/v1/1/random.php")
      .then((response) => {
        setRecommendedRecipes(response.data.meals);
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

  // if the user is not logged in, redirect them to the login route
  if (!props.user || !props.user.success) {
    return <Navigate to="/login?error=protected" />;
  }

  return (
    <div>
      <h1>Home Page</h1>
      <nav>
        <ul>
          <Link to="/my-ingredients">My Ingredients</Link>
          <br />
          <Link to="/utensils">My Utensils</Link>
          <br />
          <Link to="/saved-recipes">My Saved Recipes</Link>
          <br />
          <Link to="/recipes">Search Recipes</Link>
        </ul>
      </nav>
      <div className="RecipeList">
      <h2>Recommended Recipe for Today</h2>
      <div className="recipe-container">
        {recommendedRecipes.map((recipe) => (
          <div key={recipe.idMeal} className="recipe">
            <Link to={`/${recipe.idMeal}`} className="recipe-link">
              <img src={recipe.strMealThumb} alt={recipe.strMeal} className="recipe-image" />
              <h3>{recipe.strMeal}</h3>
            </Link>
          </div>
        ))}
      </div>
    </div>
    </div>
  );
};

export default Home;
