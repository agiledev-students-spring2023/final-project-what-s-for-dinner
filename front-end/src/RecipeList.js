import React, { useState, useEffect } from "react";
import axios from "axios";
import Search from "./Search";
import { Link } from "react-router-dom"
import SortBy from "./SortBy";
import RecipeThumb from "./RecipeThumb";
import "./RecipeList.css";

const RecipeList = (props) => {
  const [data, setData] = useState([]);
  const [sortByIngredients, setSortByIngredients] = useState(false);
  const [sortByDifficulty, setSortByDifficulty] = useState(false);
  const [sortByTimeNeeded, setSortByTimeNeeded] = useState(false);
  const [sortedData, setSortedData] = useState([]);
  const [sortOption, setSortOption] = useState("");
  useEffect(() => {
    // fetch some mock data about animals for sale
    console.log("fetching 10 random animals...");
    axios("https://www.themealdb.com/api/json/v1/1/search.php?s=a")
      .then((response) => {
        // extract the data from the server response
        setData(response.data.meals);
      })
      .catch((err) => {
        // Mockaroo, which we're using for our Mock API, only allows 200 requests per day on the free plan
        console.log(`Sorry, buster.  No more requests allowed today!`);
        console.error(err); // the server returned an error... probably too many requests... until we pay!
        const backupData = [
            {
              idMeal: 1,
              strMeal: "Paddy heron",
              strArea: "Brazil",
              strCategory: "Beef",
              strMealThumb:
                "https://www.themealdb.com/images/media/meals/xxpqsy1511452222.jpg",
              strInstructions:
                "Donec diam neque, vestibulum eget, vulputate ut, ultrices vel, augue. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; Donec pharetra, magna vestibulum aliquet ultrices, erat tortor sollicitudin mi, sit amet lobortis sapien sapien non mi. Integer ac neque."
            },
            {
              idMeal: 2,
              strMeal: "Numbat",
              strArea: "Russia",
              strCategory: "Chicken",
              strMealThumb:
                "https://www.themealdb.com/images/media/meals/yypxsu1511304979.jpg",
              strInstructions:
                "Cras non velit nec nisi vulputate nonummy. Maecenas tincidunt lacus at velit. Vivamus vel nulla eget eros elementum pellentesque."
            },
            {
              idMeal: 3,
              strMeal: "Spaghetti",
              strArea: "Russia",
              strCategory: "Pasta",
              strMealThumb:
                "https://www.themealdb.com/images/media/meals/xxyupu1468236831.jpg",
              strInstructions:
              "Cras non velit nec nisi vulputate nonummy. Maecenas tincidunt lacus at velit. Vivamus vel nulla eget eros elementum pellentesque."
            },
        ];

        if (sortOption) {
          setSortedData(sortData(data, sortOption));
        } else {
          setSortedData(data);
        }
      });
      }, [data, sortOption]); // only run it once!
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
  return (
    <div className="RecipeList">
    <h1>Recipes</h1>
    <Search />
    <button onClick={() => setSortOption("ingredients")}>
      Sort by Ingredients
    </button>
    <button onClick={() => setSortOption("difficulty")}>
      Sort by Difficulty
    </button>
    <button onClick={() => setSortOption("time")}>
      Sort by Time Needed
    </button>
    <div className="recipe-container">
    {sortedData.map((recipe) => (
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