import React, { useState, useEffect } from "react";
import axios from "axios";
import Search from "./Search";
import { Link, Navigate } from "react-router-dom"
import SortBy from "./SortBy";
import RecipeThumb from "./RecipeThumb";
import "./SavedRecipes.css"


const SavedRecipes = (props) => {
    const [data, setData] = useState([]);
    const [sortByIngredients, setSortByIngredients] = useState(false);
    const [sortByDifficulty, setSortByDifficulty] = useState(false);
    const [sortByTimeNeeded, setSortByTimeNeeded] = useState(false);

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
    
            setData(backupData);
          });
      }, []); // only run it once!

      // if the user is not logged in, redirect them to the login route
      if (!props.user || !props.user.success) {
        return <Navigate to="/login?error=protected" />;
      }

      return (
        <div className="RecipeList">
        <Search />
        <h1>My Saved Recipes</h1>
        <div className="recipe-container">
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
}

export default SavedRecipes


