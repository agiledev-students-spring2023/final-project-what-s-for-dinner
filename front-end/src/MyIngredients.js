import React, { useState, useEffect } from 'react';
import './MyIngredients.css';
import { Link, Navigate } from 'react-router-dom';

const MyIngredients = (props) => {
  const [ingredients, setIngredients] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [selectedAmount, setSelectedAmount] = useState(1);
  const username = props.user.username;

  useEffect(() => {
    // API call to fetch user's added ingredients\
    const baseUrl = process.env.REACT_APP_SERVER;
    const fetchIngredients = async () => {
      try {
        const response = await fetch(`${baseUrl}/ingredients/my-ingredients?username=${username}`); // pass user_id to the API endpoint
        const data = await response.json();
        setIngredients(data);
      } catch (error) {
        console.error('Error fetching data from API:', error);
      }
    };
    fetchIngredients();
  }, [username]); // include userId as a dependency to re-fetch ingredients when it changes

  const handleAdd = async (ingredient) => {
    // API call to add ingredient to user's inventory
    try {
      const baseUrl = process.env.REACT_APP_SERVER;
      const response = await fetch(`${baseUrl}/ingredients/my-ingredients`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...ingredient,
          username: username // add username to the ingredient object being sent to the server
        }),
      });
      if (response.ok) {
        // Update the list of ingredients if the API call was successful
        const updatedIngredients = [...ingredients];
        const existingIngredient = updatedIngredients.find(
          (i) => i.name === ingredient.name
        );
        if (existingIngredient) {
          existingIngredient.amount += ingredient.amount;
        } else {
          updatedIngredients.push(ingredient);
        }
        setIngredients(updatedIngredients);
        setSelectedAmount(1);
      } else {
        console.error('Error adding ingredient:', response.statusText);
      }
    } catch (error) {
      console.error('Error adding ingredient:', error);
    }
  };

  const handleDelete = async (ingredient) => {
    try {
      const baseUrl = process.env.REACT_APP_SERVER;
      const response = await fetch(`${baseUrl}/ingredients/my-ingredients/${ingredient.name}?username=${username}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: ingredient.name,
          amount: ingredient.amount,
          username: username,
        }),
      });
      if (response.ok) {
        const updatedIngredients = [...ingredients];
        const existingIngredient = updatedIngredients.find((i) => i.name === ingredient.name);
        if (existingIngredient) {
          existingIngredient.amount -= ingredient.amount;
          if (existingIngredient.amount <= 0) {
            updatedIngredients.splice(updatedIngredients.indexOf(existingIngredient), 1);
          }
        }
        setIngredients(updatedIngredients);
      } else {
        console.error('Error deleting ingredient:', response.statusText);
      }
    } catch (error) {
      console.error('Error deleting ingredient:', error);
    }
  }; 

  const handleAmountChange = (event) => {
    const amount = parseInt(event.target.value);
    setSelectedAmount(amount >= 1 ? amount : 1);
  };

  const canAddIngredient = () => {
    return selectedAmount > 0;
  };

  const handleSearch = async (event) => {
    //setSearchTerm(event.target.value);
    try {
      const baseUrl = process.env.REACT_APP_SERVER;
      const response = await fetch(`${baseUrl}/ingredients/search-ingredient?query=${searchTerm}`);
      const data = await response.json();
      setSearchResults(data);
      console.log(searchResults);
    } catch (error) {
      console.error('Error fetching data from API:', error);
    }
  };

  if (!props.user || !props.user.success) {
    return <Navigate to="/login?error=protected" />;
  }

  return (
    <div>
      <h1>My Ingredients Page</h1>
      <h2>Added Ingredients</h2>
      <ul>
        {ingredients && ingredients.length > 0 && 
          ingredients.map((ingredient) => (
          <li key={ingredient.id}>
            {ingredient.name} ({ingredient.amount})
            <button onClick={() => handleDelete(ingredient)}>Delete</button>
          </li>
        ))}
      </ul>
      <button><Link to="/recipes" className="button-link">Search recipes by your ingredients</Link></button>
      <h2>Search and Add Ingredients</h2>
      <div>
        <input
          type="text"
          value={searchTerm}
          onChange={(event) => setSearchTerm(event.target.value)}
          placeholder="Search for ingredients..."
        />
        <button onClick={handleSearch}>Search</button>
      </div>
      <ul>
        {searchResults && searchResults.length > 0 &&
          searchResults.map((ingredient) => (
            <li key={ingredient.id}>
              {ingredient.name}
              <input
                type="number"
                min="1"
                value={selectedAmount}
                onChange={handleAmountChange}
              />
              <br />
              <button
                onClick={() =>
                  handleAdd({
                    name: ingredient.name,
                    amount: selectedAmount,
                    id: "9266"
                  })
                }
                disabled={!canAddIngredient()}
              >
                Add
              </button>
            </li>
          ))}
      </ul>
    </div>
  );
};

export default MyIngredients;
