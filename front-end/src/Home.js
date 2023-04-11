import React, { useState, useEffect } from 'react';
import { Link, Navigate } from 'react-router-dom';
import axios from "axios";
import './Home.css';

const Home = (props) => {

  const [recommendedRecipes, setRecommendedRecipes] = useState([]);
  const baseUrl = 'http://localhost:3000';
  const endpoint = '/random-recipe';
  useEffect(() => {
    axios.get(`${baseUrl}${endpoint}`)
      .then((response) => {
        setRecommendedRecipes(response.data);
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
          <Link to="/utensils">My Utensils</Link>
          <Link to="/saved-recipes">My Saved Recipes</Link>
          <Link to="/recipes">Search Recipes</Link>
        </ul>
      </nav>
      <div className="RecipeList">
      <h2>Recommended Recipe for Today</h2>
      <div className="recipe-container">
          <div key={recommendedRecipes.idMeal} className="recipe">
            <Link to={`/${recommendedRecipes.idMeal}`} className="recipe-link">
              <img src={recommendedRecipes.strMealThumb} alt={recommendedRecipes.strMeal} className="recipe-image" />
              <h3>{recommendedRecipes.strMeal}</h3>
            </Link>
          </div>

      </div>
    </div>
    </div>
  );
};

export default Home;
