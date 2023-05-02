import React, { useState, useEffect } from "react"
import Recipe from "./Recipe"
import axios from "axios";

const Search = prop => {
    const [search, setSearch] = useState("");
    const [keyword, setKeyword] = useState('null');
    const [recipes, setRecipes] = useState([]);
    const [show, setShow] = useState(false);
    const url = `${process.env.REACT_APP_SERVER}/search`;
    const getSearch = e =>{
        e.preventDefault()
        setKeyword(search)
        setSearch('')
    }

    const updateSearch = e =>{
        setSearch(e.target.value)
        console.log(search)
    }


    useEffect(() =>{
        const getRecipes = async () => {
            axios.get(url, {
                params: {
                  keyword: `${keyword}` // need to replace this with ingredients selected by user
                }
              })
              .then(response => {
                console.log(response)
                setRecipes(response.data.recipes);
                setShow(true);
              })
              .catch(error => {
                console.error(error);
              });
        }
        getRecipes();
    }, [keyword, url]);

    return(
        <div>
            <form onSubmit={getSearch}>
                <input className="search-bar" type="text" value={search} onChange={updateSearch}/>
                <button className="search-button" type="submit">
                    Search
                </button>
            </form>
            <div>
                {
                    show ?<Recipe recipes = {recipes} /> : "Recipe Not Found"
                }
            </div>
        </div>
    )
}

export default Search;