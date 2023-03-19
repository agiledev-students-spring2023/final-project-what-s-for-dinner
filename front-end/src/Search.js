import React, { useState, useEffect } from "react"
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

export default Search;