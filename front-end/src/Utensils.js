import React, { useState, useEffect } from "react";
import { Navigate } from 'react-router-dom';
import axios from "axios";
import UtensilThumb from "./UtensilThumb";
import "./Utensils.css";

const Utensils = (props) => {
  const [data, setData] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    // Fetch utensils data from the backend API
    axios(`${process.env.REACT_APP_SERVER}/utensils`)
      .then((response) => {
        setData(response.data);
      })
      .catch((err) => {
        console.log(`Error fetching utensils data: ${err}`);
        setData([]);
      });
  }, []);

  // Associate a utensil with the user
  const addUserUtensil = async (utensilId) => {
    try {
      const userId = props.user.id;
      await axios.post(`${process.env.REACT_APP_SERVER}/user-utensils`, { userId, utensilId });
      alert('Utensil added to your account successfully');
    } catch (error) {
      console.error('Error adding utensil to user:', error);
      alert('Failed to add utensil to your account');
    }
  };

  // Filter utensils based on the search term
  const filteredUtensils = data.filter(utensil => utensil.utensil_title.toLowerCase().includes(searchTerm.toLowerCase()));

  // If the user is not logged in, redirect them to the login route
  if (!props.user || !props.user.success) {
    return <Navigate to="/login?error=protected" />;
  }

  return (
    <div className="Utensils">
      <h1>My Utensils</h1>
      <input
        type="text"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        placeholder="Search for utensils"
      />
      <section className="utensils">
        {/* Show a thumbnail for each utensil item */}
        {filteredUtensils.map((item) => (
          <UtensilThumb key={item._id} details={item} addUserUtensil={() => addUserUtensil(item._id)} />
        ))}
      </section>
    </div>
  );
};

export default Utensils;
