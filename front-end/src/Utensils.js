import React, { useState, useEffect } from "react";
import axios from "axios";
import Search from "./Search";
import SortBy from "./SortBy";
import UtensilThumb from "./UtensilThumb";
import "./Utensils.css";

const RecipeList = (props) => {
  const [data, setData] = useState([]);
  const [sortByIngredients, setSortByIngredients] = useState(false);
  const [sortByDifficulty, setSortByDifficulty] = useState(false);
  const [sortByTimeNeeded, setSortByTimeNeeded] = useState(false);
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
        const backupData = [
          {
            id: 1,
            recipe_title: "Paddy heron",
            country: "Brazil",
            price: "$10.51",
            recipe_description:
              "Donec diam neque, vestibulum eget, vulputate ut, ultrices vel, augue. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; Donec pharetra, magna vestibulum aliquet ultrices, erat tortor sollicitudin mi, sit amet lobortis sapien sapien non mi. Integer ac neque."
          },
          {
            id: 2,
            recipe_title: "Numbat",
            country: "Russia",
            price: "$2.37",
            recipe_description:
              "Cras non velit nec nisi vulputate nonummy. Maecenas tincidunt lacus at velit. Vivamus vel nulla eget eros elementum pellentesque."
          },
          {
            id: 3,
            recipe_title: "Spaghetti",
            country: "Russia",
            price: "$2.37",
            recipe_description:
              "Cras non velit nec nisi vulputate nonummy. Maecenas tincidunt lacus at velit. Vivamus vel nulla eget eros elementum pellentesque."
          }
        ];

        setData(backupData);
      });
  }, []); // only run it once!
  return (
    <div className="RecipeList">
      <h1>Recipes</h1>
      <Search />
      <SortBy
       sortByIngredients={sortByIngredients}
       setSortByIngredients={setSortByIngredients}
       sortByDifficulty={sortByDifficulty}
       setSortByDifficulty={setSortByDifficulty}
       sortByTimeNeeded={sortByTimeNeeded}
       setSortByTimeNeeded={setSortByTimeNeeded}
     />
      <section className="recipes">
        {/* show a thumbnail for each food item */}
        {data.map((item) => (
          <RecipeThumb key={item.id} details={item} />
        ))}
      </section>
    </div>
  );
};

export default RecipeList;