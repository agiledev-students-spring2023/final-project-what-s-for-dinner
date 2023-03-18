import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import axios from "axios";
import Search from "./components/search/Search";
import RecipeThumb from "./RecipeThumb";
import "./RecipesThumb.css";

const RecipeList = (props) => {
  const [data, setData] = useState([]);
  useEffect(() => {
    // fetch some mock data about animals for sale
    console.log("fetching 10 random animals...");
    axios("https://api.mockaroo.com/api/2ed4ec20?count=10&key=1fd5b940")
      .then((response) => {
        // extract the data from the server response
        setData(response.data);
      })
      .catch((err) => {
        // Mockaroo, which we're using for our Mock API, only allows 200 requests per day on the free plan
        console.log(`Sorry, buster.  No more requests allowed today!`);
        console.error(err); // the server returned an error... probably too many requests... until we pay!
      });
  }, []); // only run it once!
  return (
    <div className="RecipeList">
      <h1>Recipes</h1>
      <Search />
      <section className="main-content">
        <img alt="recipes" src="https://picsum.photos/200?page=animals" />
      </section>
      <section className="recipes">
        {/* show a thumbnail for each animal */}
        {data.map((item) => (
          <RecipeThumb key={item.id} details={item} />
        ))}
      </section>
    </div>
  );
};

export default RecipeList;