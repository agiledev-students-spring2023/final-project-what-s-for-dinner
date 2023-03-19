import { async } from "q";
import React, { useState, useEffect } from "react"
import RecipeDetails from "./RecipeDetails"
import Recipe from "./Recipe"

const Search = prop => {
    const [search, setSearch] = useState("");
    const [keyword, setKeyword] = useState('broccoli');
    const [recipes, setRecipies] = useState([]);
    const [show, setShow] = useState(false);

    const getSearch = e =>{
        e.preventDefault()
        setKeyword(search)
        setSearch('')
    }

    const updateSearch = e =>{
        setSearch(e.target.value)
        console.log(search)
    }

    const getRecipes = async () => {
        const response = await fetch (`https://www.themealdb.com/api/json/v1/1/search.php?s=${keyword}`);
        const data = await response.json();
        setRecipies(data.meals);
        setShow(true)
    }


    useEffect(() =>{
        getRecipes();
    }, [keyword]);

    return(
        <div>
            <form onSubmit={getSearch}>
                <input className="search-bar" type="text" value={search} onChange={updateSearch}/>
                <button className="search-button">
                    Search
                </button>
            </form>
            <div>
                {
                    show ?<Recipe data = {recipes} /> : "Recipe Not Found"
                }
            </div>
        </div>
    )
}

// const Search = props =>{
//     const APP_ID = 'c0c8637f';
//     const APP_KEY = '5e4ebd965788596c968c5fd7d59250fe';
//     const KEYWORD = 'broccoli'; //sample search keyword

//     const [recipes, setRecipies] = useState([]);
//     const [search, setSearch] = useState("");
//     const [keyword, setKeyword] = useState('broccoli');

//     const getRecipes = async () =>{
//     const response = await fetch(`https://api.edamam.com/api/recipes/v2?type=public&q=${keyword}&app_id=${APP_ID}&app_key=${APP_KEY}`);
//     const data = await response.json(); //wait data from external api
//     setRecipies(data.hits)
//     console.log(data.hits)
//   }

//     const updateSearch = e =>{
//         setSearch(e.target.value)
//         console.log(search)
//     }

//     const getSearch = e =>{
//         e.preventDefault()
//         setKeyword(search)
//         setSearch('')
//     }

//   useEffect(() =>{
//     getRecipes()
//   }, [keyword]);
//     return(
//         <div>
//             <form onSubmit={getSearch}>
//                 <input className="search-bar" type="text" value={search} onChange={updateSearch}/>
//                 <button className="search-button">
//                     Search
//                 </button>
//             </form>
//             {recipes.map(recipe => (
//                 <RecipeDetails 
//                 key={recipe.recipe.label}
//                 title ={recipe.recipe.label} 
//                 ingredients = {recipe.recipe.ingredients}
//                 image = {recipe.recipe.image}/>
                
//             ))}
//         </div>
//     )
// }

export default Search;