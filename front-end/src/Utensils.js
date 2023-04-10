import React, { useState, useEffect } from "react";
import axios from "axios";
import Search from "./Search";
import UtensilThumb from "./UtensilThumb";
import "./Utensils.css";

const Utensils = (props) => {
  const [data, setData] = useState([]);

  useEffect(() => {
    // Fetch utensils data from the new backend API
    axios("http://localhost:3001/api/utensils")
    // Fetch utensils data from the new backend API
    axios("http://localhost:3000/utensils")
      .then((response) => {
        setData(response.data);
      })
      .catch((err) => {
        console.log(`Error fetching utensils data: ${err}`);
        setData([]);
      });
  }, []);

  return (
    <div className="Utensils">
      <h1>My Utensils</h1>
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
