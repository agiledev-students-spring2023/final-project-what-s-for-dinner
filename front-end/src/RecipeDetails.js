import React, { useState, useEffect } from "react"
import { useParams } from "react-router"
import "./RecipeDetails.css"

const RecipeDetails = prop => {
    const [item, setItem] = useState();
    const {recipeId} = useParams();

    const getRecipe = async() =>{
        const response = await fetch (`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${recipeId}`);
        const data = await response.json();
        setItem(data.meals[0]);
    }

    if (recipeId !== " "){
        getRecipe();
    }

    return(
        <>
        {
            (!item) ? "" : <div className="content">
                <img src={item.strMealThumb} alt = {item.idMeal}/>
                <div className="title">
                    <h1>{item.strMeal}</h1>
                    
                </div>
                <div className="cuisine">
                    <h2>{item.strArea} Food</h2>
                </div>
                <div className="category">
                    <h2>Category: {item.strCategory}</h2>
                </div>
                <div className="ingredients">
                    <h2>Ingredients</h2>
                    {
                        item.strIngredient1 ? (
                        <h4>{item.strIngredient1}: {item.strMeasure1}</h4>
                        ) : null
                    }
                    {
                        item.strIngredient2 ? (
                        <h4>{item.strIngredient2}: {item.strMeasure2}</h4>
                        ) : null
                    }
                    {
                        item.strIngredient3 ? (
                        <h4>{item.strIngredient3}: {item.strMeasure3}</h4>
                        ) : null
                    }
                    {
                        item.strIngredient20 ? (
                        <h4>{item.strIngredient20}: {item.strMeasure20}</h4>
                        ) : null
                    }
                    {
                        item.strIngredient4 ? (
                        <h4>{item.strIngredient4}: {item.strMeasure4}</h4>
                        ) : null
                    }
                    {
                        item.strIngredient5 ? (
                        <h4>{item.strIngredient5}: {item.strMeasure5}</h4>
                        ) : null
                    }
                    {
                        item.strIngredient6 ? (
                        <h4>{item.strIngredient6}: {item.strMeasure6}</h4>
                        ) : null
                    }
                    {
                        item.strIngredient7 ? (
                        <h4>{item.strIngredient7}: {item.strMeasure7}</h4>
                        ) : null
                    }
                    {
                        item.strIngredient8 ? (
                        <h4>{item.strIngredient8}: {item.strMeasure8}</h4>
                        ) : null
                    }
                    {
                        item.strIngredient9 ? (
                        <h4>{item.strIngredient9}: {item.strMeasure9}</h4>
                        ) : null
                    }
                    {
                        item.strIngredient10 ? (
                        <h4>{item.strIngredient10}: {item.strMeasure10}</h4>
                        ) : null
                    }
                    {
                        item.strIngredient11 ? (
                        <h4>{item.strIngredient11}: {item.strMeasure11}</h4>
                        ) : null
                    }
                    {
                        item.strIngredient12 ? (
                        <h4>{item.strIngredient12}: {item.strMeasure12}</h4>
                        ) : null
                    }
                    {
                        item.strIngredient13 ? (
                        <h4>{item.strIngredient13}: {item.strMeasure13}</h4>
                        ) : null
                    }
                    {
                        item.strIngredient14 ? (
                        <h4>{item.strIngredient14}: {item.strMeasure14}</h4>
                        ) : null
                    }
                    {
                        item.strIngredient15 ? (
                        <h4>{item.strIngredient15}: {item.strMeasure15}</h4>
                        ) : null
                    }
                    {
                        item.strIngredient16 ? (
                        <h4>{item.strIngredient16}: {item.strMeasure16}</h4>
                        ) : null
                    }
                    {
                        item.strIngredient17 ? (
                        <h4>{item.strIngredient17}: {item.strMeasure17}</h4>
                        ) : null
                    }
                    {
                        item.strIngredient18 ? (
                        <h4>{item.strIngredient18}: {item.strMeasure18}</h4>
                        ) : null
                    }
                    {
                        item.strIngredient19 ? (
                        <h4>{item.strIngredient19}: {item.strMeasure19}</h4>
                        ) : null
                    }
                    {
                        item.strIngredient20 ? (
                        <h4>{item.strIngredient20}: {item.strMeasure20}</h4>
                        ) : null
                    }
                </div>
                <div className="instructions">
                    <h2>Instructions</h2>
                    <h4>{item.strInstructions}</h4>
                </div>

            </div>
        }
        </>
    )
}


export default RecipeDetails