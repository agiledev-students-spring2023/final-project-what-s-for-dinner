import React from "react"
import { useNavigate } from "react-router"
import "./Recipe.css";
const Recipe = ({recipes}) =>{
    console.log(recipes);
    let navigate = useNavigate();
    return (
        <div>
            {
                recipes && recipes.length ? recipes.map((recipe) => {
                    return (
                        <div className="card" 
                            key={recipe.id}
                            onClick={() => navigate(`/${recipe.id}`)}
                        >
                            <img src={recipe.thumbnail} alt="" className="recipe-image" />
                            <h3>{recipe.name}</h3>
                        </div>
                    );
                }) : "Recipe Not Found"
            }
        </div>
    )
}

export default Recipe