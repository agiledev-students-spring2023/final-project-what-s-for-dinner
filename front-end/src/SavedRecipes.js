import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link, Navigate } from "react-router-dom"
import "./SavedRecipes.css";

const SavedRecipes = (props) => {
  const baseUrl = process.env.REACT_APP_SERVER;
  const endPoint = `saved-recipes?username=${props.user.username}`
  const images = '/api/images/';
  const [data, setData] = useState([]);
  const [page, setPage] = useState(1);

  const handleScroll = async () => {
    const { scrollTop, clientHeight, scrollHeight } = document.documentElement;
    if (scrollTop + clientHeight >= scrollHeight) {
      setPage((page) => page + 1);
    }
  };
  
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`${baseUrl}/${endPoint}`);
        const newRecipes = response.data.savedRecipes;
        console.log(response.data);
        setData(newRecipes);
        //setSentRecipeIds(ids => [...ids, ...newRecipes.map(recipe => recipe._id)]);
      } catch (error) {
        console.error(error);
      }
    };
    
  
    fetchData();
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [page, baseUrl, endPoint]);

  if (!props.user || !props.user.success) {
    return <Navigate to="/login?error=protected" />;
  }
  
  return (
    <div className="RecipeList">
    <h1>Saved Recipes</h1>
    <div className="recipe-container">
    {data.map((recipe) => (
      <div key={recipe._id} className="recipe">
        <Link to={`/${recipe._id}`} className="recipe-link">
          <img src={`${baseUrl}${images}${recipe.Image_Name}.jpg`} alt={recipe.Title} className="recipe-image" />
          <h3>{recipe.Title}</h3>
        </Link>
      </div>
    ))}
      </div>
    </div>
  );
};

export default SavedRecipes;

