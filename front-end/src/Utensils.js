import React, { useState, useEffect } from "react";
import axios from "axios";
import Search from "./Search";
import UtensilThumb from "./UtensilThumb";
import "./Utensils.css";

const Utensils = (props) => {
  const [data, setData] = useState([]);
  useEffect(() => {
    // fetch some mock data about animals for sale
    console.log("fetching 10 random things...");
    axios("https://my.api.mockaroo.com/utensils?key=1fd5b940")
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
            recipe_title: "Whisk",
            country: "Brazil",
            price: "$10.51",
            recipe_description:
              "Donec diam neque, vestibulum eget, vulputate ut, ultrices vel, augue. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; Donec pharetra, magna vestibulum aliquet ultrices, erat tortor sollicitudin mi, sit amet lobortis sapien sapien non mi. Integer ac neque."
          },
          {
            id: 2,
            recipe_title: "Spatula",
            country: "Russia",
            price: "$2.37",
            recipe_description:
              "Cras non velit nec nisi vulputate nonummy. Maecenas tincidunt lacus at velit. Vivamus vel nulla eget eros elementum pellentesque."
          },
          {
            id: 3,
            recipe_title: "Knife",
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
    <div className="Utensil">
      <h1>Utensils</h1>
      <Search />
      <section className="utensils">
        {/* show a thumbnail for each food item */}
        {data.map((item) => (
          <UtensilThumb key={item.id} details={item} />
        ))}
      </section>
    </div>
  );
};

export default Utensils;