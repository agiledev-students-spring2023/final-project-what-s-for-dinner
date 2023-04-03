import React, { useState, useEffect } from "react"
import { useParams } from "react-router"
import "./RecipeDetails.css"

const RecipeDetails = prop => {
    const [item, setItem] = useState();
    const {recipeId} = useParams();
    
    useEffect(() => {
        const fetchRecipe = async () => {
            try {
              const response = await fetch(`/recipes/${recipeId}`);
              const data = await response.json();
              console.log("Before setItem(): ", data);
              setItem(() => data);
              console.log("After setItem(): ", item);
            } catch (error) {
              console.error(error);
            }
          };
      
          if (recipeId !== " ") {
            fetchRecipe();
          }
    }, [recipeId]);

    useEffect(() => {
        console.log("item after update: ", item);
      }, [item]);

    return(
        <>
        {
            (!item) ? "" : <div className="content">
                <img src={item.data.thumbnail} alt={item.idMeal} />
                <div className="title">
                    <h1>{item.data.name}</h1>   
                </div>
                <div className="cuisine">
                    <h2>{item.data.area} Food</h2>
                </div>
                <div className="category">
                    <h2>Category: {item.data.category}</h2>
                </div>
                <div className="ingredients">
                    <h2>Ingredients</h2>
                    {item.data.ingredients.map((ingredient, index) => (
                    <h4 key={index}>
                        {ingredient.name}: {ingredient.measurement}
                    </h4>
                    ))}
                </div>
                <div className="instructions">
                    <h2>Instructions</h2>
                    <h4>{item.data.instructions}</h4>
                </div>

            </div>
        }
        </>
    )
}


export default RecipeDetails