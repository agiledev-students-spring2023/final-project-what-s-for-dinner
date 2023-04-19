import React, { useState, useEffect } from "react";
import axios from "axios";
import Search from "./Search";
import { Link } from "react-router-dom"
import SortBy from "./SortBy";
import "./RecipeList.css";

const RecipeList = (props) => {
  const baseUrl = 'http://localhost:3000';
  const endpoint = '/recipes';
  const [data, setData] = useState([]);
  //const [sortedData, setSortedData] = useState([]);
  const [sortOption, setSortOption] = useState("");
  useEffect(() => {
        let  url = `${baseUrl}${endpoint}`
        if (sortOption === "time") {
          url = `${baseUrl}/recipes/sort-by-time`;
        } else if (sortOption === "similar") {
          url = `${baseUrl}/sort-by-similar`;
        }
        axios.get(url)
        .then(response => {
          setData(response.data.recipes);
          console.log(response);
        })
        .catch(error => {
          console.error(error);
        });
      }, [sortOption]); // only run it once!
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
          <img src={`/static/foodimages/${recipe.Image_Name}.jpg`} alt={recipe.Title} className="recipe-image" />
          <h3>{recipe.Title}</h3>
        </Link>
      </div>
    ))}
      </div>
    </div>
  );
};

export default RecipeList;