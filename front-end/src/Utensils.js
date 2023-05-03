import React, { useState, useEffect } from "react";
import { Navigate } from "react-router-dom";
import axios from "axios";
import UtensilThumb from "./UtensilThumb";
import "./Utensils.css";

const Utensils = (props) => {
  const [utensils, setUtensils] = useState([]);
  const [selectedUtensils, setSelectedUtensils] = useState([]);

  useEffect(() => {
    axios(`${process.env.REACT_APP_SERVER}/utensils`)
      .then((response) => {
        setUtensils(response.data);
      })
      .catch((err) => {
        console.log(`Error fetching utensils data: ${err}`);
        setUtensils([]);
      });
  }, []);

  const handleAddUtensil = (utensilId) => {
    setSelectedUtensils([...selectedUtensils, utensilId]);
  };

  const handleDeleteUtensil = (utensilId) => {
    setSelectedUtensils(selectedUtensils.filter((id) => id !== utensilId));
  };

  if (!props.user || !props.user.success) {
    return <Navigate to="/login?error=protected" />;
  }

  return (
    <div className="Utensils">
      <h1>My Utensils</h1>
      <p>Select Utensils That You Have Available</p>
      <section className="utensils">
        {utensils.map((item) => (
          <UtensilThumb
            key={item._id}
            details={item}
            isSelected={selectedUtensils.includes(item._id)}
            handleAddUtensil={handleAddUtensil}
            handleDeleteUtensil={handleDeleteUtensil}
          />
        ))}
      </section>
    </div>
  );
};

export default Utensils;
