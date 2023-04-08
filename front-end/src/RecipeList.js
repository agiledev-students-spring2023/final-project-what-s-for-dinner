import React, { useState, useEffect } from "react";
import axios from "axios";
import Search from "./Search";
import { Link } from "react-router-dom"
import SortBy from "./SortBy";
import RecipeThumb from "./RecipeThumb";
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
        } else if (sortOption === "difficulty") {
          url = `${baseUrl}/sort-by-difficulty`;
        }
        axios.get(url, {
          params: {
            ingredients: 'egg' // need to replace this with ingredients selected by user
          }
        })
        .then(response => {
          setData(response.data.meals);
        })
        .catch(error => {
          console.error(error);
        });
      }, [sortOption]); // only run it once!
    /*
  const sortData = (data, option) => {
    let sortedData = [...data];
    switch (option) {
      case "ingredients":
        sortedData.sort((a, b) => a.strIngredient1.localeCompare(b.strIngredient1));
        break;
      case "difficulty":
        sortedData.sort((a, b) => a.strArea.localeCompare(b.strArea));
        break;
      case "time":
        sortedData.sort((a, b) => a.idMeal.localeCompare(b.idMeal));
        break;
      default:
        break;
    }
    return sortedData;
  };
  useEffect(() => {
    if (sortOption) {
      setSortedData(sortData(data, sortOption));
    } else {
      setSortedData(data);
    }
  }, [data, sortOption]);
  */
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
      <div key={recipe.idMeal} className="recipe">
        <Link to={`/${recipe.idMeal}`} className="recipe-link">
          <img src={recipe.strMealThumb} alt={recipe.strMeal} className="recipe-image" />
          <h3>{recipe.strMeal}</h3>
        </Link>
      </div>
    ))}
      </div>
    </div>
  );
};

export default RecipeList;