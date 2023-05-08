import React, { useState, useEffect } from "react";
import axios from "axios";
// import Search from "./Search";
import { Link } from "react-router-dom"
import SortBy from "./SortBy";
import SelectIng from "./SelectIng";
import "./RecipeList.css";

const RecipeList = (props) => {
  const baseUrl = process.env.REACT_APP_SERVER;
  const images = '/api/images/';
  const [data, setData] = useState([]);
  const [selectedIngredients, setSelectedIngredients] = useState([]);
  const [sortOption, setSortOption] = useState("");
  const [page, setPage] = useState(1);
  const [perPage, setPerPage] = useState(10);
  const [sortUrl, setSortUrl] = useState(`/recipes?username=${props.user.username}&ingredients=${selectedIngredients.map(selected => selected && selected.name).join(",")}`);
  const [sentRecipeIds, setSentRecipeIds] = useState([]);

  const handleScroll = async () => {
    const { scrollTop, clientHeight, scrollHeight } = document.documentElement;
    if (scrollTop + clientHeight >= scrollHeight) {
      setPage((page) => page + 1);
    }
  };
  
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`${baseUrl}${sortUrl}&limit=${perPage}&sentRecipeIds=${sentRecipeIds.join(',')}`);
        const newRecipes = response.data.recipes.filter(
          recipe => !sentRecipeIds.includes(recipe._id)
        );
        setData(data => [...data, ...newRecipes]);
        setSentRecipeIds(ids => [...ids, ...newRecipes.map(recipe => recipe._id)]);
      } catch (error) {
        console.error(error);
      }
    };
    
  
    fetchData();
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [sortUrl, selectedIngredients, page]);
    

  useEffect(() => {
    setSentRecipeIds([]);
    setSortUrl(`/recipes?username=${props.user.username}&ingredients=${selectedIngredients.map(selected => selected && selected.name).join(",")}`);
  }, [selectedIngredients]);

  const handleSortChange = (option) => {
    setSortOption(option);
    let sortUrl = "";
    if (option === "time") {
      sortUrl = `/recipes/sort-by-time?username=${props.user.username}&ingredients=${selectedIngredients
        .map((selected) => selected && selected.name)
        .join(",")}`;
    } else if (option === "similar") {
      sortUrl = `/recipes/sort-by-similar?username=${props.user.username}&ingredients=${selectedIngredients
        .map((selected) => selected && selected.name)
        .join(",")}`;
    } else {
      sortUrl = `/recipes?username=${props.user.username}&ingredients=${selectedIngredients
        .map((selected) => selected && selected.name)
        .join(",")}`;
    }
    setPerPage(10);
    setData([]);
    setSortUrl(sortUrl);
    setPerPage(perPage => perPage + 10);

  };
  

  const handleIngredientSelect = (ingredientName) => {
    const ingredientObject = { name: ingredientName };
    if (selectedIngredients.some(ingredient => ingredient.name === ingredientName)) {
      setSelectedIngredients(selectedIngredients.filter(ingredient => ingredient.name !== ingredientName));
    } else {
      setSelectedIngredients([...selectedIngredients, { name: ingredientName }]);
    }
    //setPerPage(perPage => perPage + 10);
    setData([]);
  };
  
  return (
    <div className="RecipeList">
    <h1>Recipes</h1>
    <div className="recipe-container">
      <SortBy handleSortChange={handleSortChange} />
      <SelectIng handleIngredientSelect={handleIngredientSelect} user={props.user} />
      {selectedIngredients.length > 0 ? (
        data.map((recipe) => (
          <div key={recipe._id} className="recipe">
            <Link to={`/${recipe._id}`} className="recipe-link">
              <img src={`${baseUrl}${images}${recipe.Image_Name}.jpg`} alt={recipe.Title} className="recipe-image" />
              <h3>{recipe.Title}</h3>
            </Link>
          </div>
        ))
      ) : (
        <p>Please select ingredients to view recipes.</p>
      )}
    </div>
  </div>
  );
};

export default RecipeList;