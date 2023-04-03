import React, { useState, useEffect } from "react";
import axios from "axios";
import Search from "./Search";
import { Link } from "react-router-dom"
import SortBy from "./SortBy";
import RecipeThumb from "./RecipeThumb";
import "./RecipeList.css";

const RecipeList = (props) => {
  const [data, setData] = useState([]);
  //const [sortedData, setSortedData] = useState([]);
  const [sortOption, setSortOption] = useState("");
  useEffect(() => {
        let url = "/recipes"
        if (sortOption === "time") {
          url = "/recipes/sort-by-time";
        } else if (sortOption === "difficulty") {
          url = "/recipes/sort-by-difficulty";
        }
        axios.get(url, {
          params: {
            ingredients: 'tomato' // need to replace this with ingredients selected by user
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