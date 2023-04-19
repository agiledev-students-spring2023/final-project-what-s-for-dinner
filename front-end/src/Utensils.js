import React, { useState, useEffect } from "react";
import { Navigate } from 'react-router-dom';
import axios from "axios";
import UtensilThumb from "./UtensilThumb";
import "./Utensils.css";

const Utensils = (props) => {
  const [data, setData] = useState([]);

  useEffect(() => {
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

  // if the user is not logged in, redirect them to the login route
  if (!props.user || !props.user.success) {
    return <Navigate to="/login?error=protected" />;
  }

  return (
    <div className="Utensils">
      <h1>My Utensils</h1>
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
