import React, { useState, useEffect } from "react";
import axios from "axios";
import Search from "./Search";
import { Link } from "react-router-dom"
import SortBy from "./SortBy";
import "./RecipeList.css";

const RecipeList = (props) => {
  const baseUrl = 'http://localhost:3000';
  const images = '/api/images/';
  const [data, setData] = useState([]);
  const [sortOption, setSortOption] = useState("");
  const username = props.user.username;
  const endpoint = `/recipes?username=${username}`;
  useEffect(() => {
        let  url = `${baseUrl}${endpoint}`
        if (sortOption === "time") {
          url = `${baseUrl}/recipes/sort-by-time?username=${username}`;
        } else if (sortOption === "similar") {
          url = `${baseUrl}recipes/sort-by-similar?username=${username}`;
        }
        axios.get(url)
        .then(response => {
          setData(response.data.recipes);
          console.log(response);
        })
        .catch(error => {
          console.error(error);
        });
      }, [sortOption, username]); // only run it once!
  const handleSortChange = (option) => {
    setSortOption(option);
  }
  return (
    <div className="RecipeList">
    <h1>Recipes</h1>
    <Search />
    <div className="recipe-container">
    <SortBy handleSortChange={handleSortChange} />
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

export default RecipeList;