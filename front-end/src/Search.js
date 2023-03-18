import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import MenuItem from "@material-ui/core/MenuItem";
import "./Search.css";

const useStyles = makeStyles((theme) => ({
  searchField: {
    marginRight: theme.spacing(2)
  },
  searchButton: {
    backgroundColor: theme.palette.secondary.main,
    color: "white"
  }
}));
const Search = () => {
  const classes = useStyles();
  const [query, setQuery] = useState("");
  const [cuisine, setCuisine] = useState("");

  const handleQueryChange = (event) => {
    setQuery(event.target.value);
  };

  const handleCuisineChange = (event) => {
    setCuisine(event.target.value);
  };

  const handleSearchClick = () => {
    // TODO: Perform API call to retrieve recipe search results
  };

  return (
    <div className={classes.root}>
      <div className={classes.form}>
        <TextField
          className={classes.searchField}
          label="Search for a recipe"
          value={query}
          onChange={handleQueryChange}
        />
        <TextField
          select
          label="Cuisine"
          value={cuisine}
          onChange={handleCuisineChange}
        >
          <MenuItem value="italian">Italian</MenuItem>
          <MenuItem value="mexican">Mexican</MenuItem>
          <MenuItem value="chinese">Chinese</MenuItem>
          <MenuItem value="indian">Indian</MenuItem>
        </TextField>
        <Button
          className={classes.searchButton}
          variant="contained"
          onClick={handleSearchClick}
        >
          Search
        </Button>
      </div>
    </div>
  );
};

export default Search;