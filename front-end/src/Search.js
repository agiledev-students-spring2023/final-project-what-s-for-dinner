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

// import React, { useState } from "react";
// import { makeStyles } from "@material-ui/core/styles";
// import TextField from "@material-ui/core/TextField";
// import Button from "@material-ui/core/Button";
// import MenuItem from "@material-ui/core/MenuItem";
// import "./Search.css";

// const useStyles = makeStyles((theme) => ({
//   searchField: {
//     marginRight: theme.spacing(2)
//   },
//   searchButton: {
//     backgroundColor: theme.palette.secondary.main,
//     color: "white"
//   }
// }));
// const Search = () => {
//   const classes = useStyles();
//   const [query, setQuery] = useState("");
//   const [cuisine, setCuisine] = useState("");

//   const handleQueryChange = (event) => {
//     setQuery(event.target.value);
//   };

//   const handleCuisineChange = (event) => {
//     setCuisine(event.target.value);
//   };

//   const handleSearchClick = () => {
//     // TODO: Perform API call to retrieve recipe search results
//   };

//   return (
//     <div className={classes.root}>
//       <div className={classes.form}>
//         <TextField
//           className={classes.searchField}
//           label="Search for a recipe"
//           value={query}
//           onChange={handleQueryChange}
//         />
//         <TextField
//           select
//           label="Cuisine"
//           value={cuisine}
//           onChange={handleCuisineChange}
//         >
//           <MenuItem value="italian">Italian</MenuItem>
//           <MenuItem value="mexican">Mexican</MenuItem>
//           <MenuItem value="chinese">Chinese</MenuItem>
//           <MenuItem value="indian">Indian</MenuItem>
//         </TextField>
//         <Button
//           className={classes.searchButton}
//           variant="contained"
//           onClick={handleSearchClick}
//         >
//           Search
//         </Button>
//       </div>
//     </div>
//   );
// };

export default Search;