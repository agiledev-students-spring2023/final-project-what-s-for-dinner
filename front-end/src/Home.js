import React, { useState, useEffect } from 'react';
import { Link, Navigate } from 'react-router-dom';
import axios from "axios";
import './Home.css';

const Home = (props) => {

  const [recommendedRecipes, setRecommendedRecipes] = useState([]);
  const baseUrl = process.env.REACT_APP_SERVER;
  const endpoint = '/random-recipe';
  const images = '/api/images/';
  useEffect(() => {
    axios.get(`${baseUrl}${endpoint}`)
      .then((response) => {
        setRecommendedRecipes(response.data);
      })
      .catch((error) => {
        console.error(error);
      });
  }, [baseUrl]);

  // if the user is not logged in, redirect them to the login route
  if (!props.user || !props.user.success) {
    return <Navigate to="/login?error=protected" />;
  }

  return (
    <div>
      <h1>Home Page</h1>
      <nav>
        <ul>
          <li><Link to="/my-ingredients">My Ingredients</Link></li>
          <li><Link to="/utensils">My Utensils</Link></li>
          <li><Link to="/saved-recipes">My Saved Recipes</Link></li>
          <li><Link to="/search">Search Recipes</Link></li>
        </ul>
      </nav>
      <div className="RecipeList">
        <h2>Recommended Recipe for Today</h2>
        <div className="recipe-container">
          <div key={recommendedRecipes._id} className="recipe">
            <Link to={`/${recommendedRecipes._id}`} className="recipe-link">
              <img src={`${baseUrl}${images}${recommendedRecipes.Image_Name}.jpg`} alt={recommendedRecipes.Title} className="recipe-image" />
              <h3>{recommendedRecipes.Title}</h3>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;