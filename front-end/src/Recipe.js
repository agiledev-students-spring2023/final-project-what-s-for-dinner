import React from "react"
import { useNavigate } from "react-router"
import "./Recipe.css";
const Recipe = ({data}) =>{
    console.log(data);
    let navigate = useNavigate();
    return(
        <div>
            {
                (!data) ? "Not Found" : data.map(item=>{
                    return(
                        <div className="card" 
                        key = {item.idMeal}
                        onClick = {()=>navigate(`/${item.idMeal}`)}>
                            <img src={item.strMealThumb} alt = "" className = "recipe-image" />
                            <h3>{item.strMeal}</h3>
                        </div>
                    )
                })
            }
        </div>
    )
}

export default Recipe