import React, { useState, useEffect } from "react";
import axios from "axios";

const SelectIng = ({ handleIngredientSelect, user }) => {
  const baseUrl = 'http://localhost:3000';
  const [ingredients, setIngredients] = useState([]);
  useEffect(() => {
    const username = user.username;
    axios.get(`${baseUrl}/my-ingredients?username=${username}`)
      .then(response => {
        const names = response.data.map(obj => obj.name); // extract name values and create new array
        setIngredients(names);
      })
      .catch(error => {
        console.error(error);
      });
  }, [user.username]);

  return (
    <div>
      <label htmlFor="selectIng">Select Ingredients:</label>
      <div>
        {ingredients.length > 0 && ingredients.map((name) => (
          <label key={name}>
            <input type="checkbox" value={name} onChange={(event) => handleIngredientSelect(name)} />
            {name}
          </label>
        ))}
      </div>
    </div>
  );
};

export default SelectIng;
