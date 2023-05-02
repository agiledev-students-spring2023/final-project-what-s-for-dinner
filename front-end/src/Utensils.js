import React, { useState, useEffect } from "react";
import { Navigate } from "react-router-dom";
import axios from "axios";
import UtensilThumb from "./UtensilThumb";
import "./Utensils.css";

const Utensils = (props) => {
  const [data, setData] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    // Fetch utensils data from the new backend API
    axios(`${process.env.REACT_APP_SERVER}/utensils`)
      .then((response) => {
        setUtensils(response.data);
      })
      .catch((err) => {
        console.log(`Error fetching utensils data: ${err}`);
        setUtensils([]);
      });
  }, []);

  // Fetch and save the utensils data from the Spoonacular API
  const fetchAndSaveUtensils = async (recipeId) => {
    try {
      await axios.get(`${process.env.REACT_APP_SERVER}/utensils/fetch-from-api?recipeId=${recipeId}`);
      console.log('Utensils data fetched and saved successfully');
    } catch (error) {
      console.error('Error fetching and saving utensils data:', error);
    }
  };

  // if the user is not logged in, redirect them to the login route
  if (!props.user || !props.user.success) {
    return <Navigate to="/login?error=protected" />;
  }

  return (
    <div className="Utensils">
      <h1>My Utensils</h1>
      <button onClick={() => fetchAndSaveUtensils(715538)}>Fetch and Save Utensils Data</button>
      <section className="utensils">
        {/* show a thumbnail for each utensil item */}
        {data.map((item) => (
          <UtensilThumb key={item.id} details={item} />
        ))}
      </section>
    </div>
  );
};

export default Utensils;
