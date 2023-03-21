import React, { useState, useEffect } from 'react';
import { Link, Navigate } from 'react-router-dom';
import axios from "axios";
import './Home.css';

const Home = (props) => {
  const [products, setProducts] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');

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

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch('https://fakestoreapi.com/products');
        const data = await response.json();
        setProducts(data);
      } catch (error) {
        console.error('Error fetching data from Fake Store API:', error);
      }
    };
    fetchProducts();
  }, []);

  const filteredProducts = products.filter((product) =>
    product.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // if the user is not logged in, redirect them to the login route
  if (!props.user || !props.user.success) {
    return <Navigate to="/login?error=protected" />;
  }

  return (
    <div>
      <h1>Home Page</h1>
      <nav>
        <ul>
          <Link to="/my-ingredients">My Ingredients Page</Link>
          <br />
          <Link to="/utensils">My Utensils Page</Link>
          <br />
          <Link to="/saved-recipes">My Saved Recipes Page</Link>
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
