import React, { useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import './MyIngredients.css';

const MyIngredients = () => {
  const [ingredients, setIngredients] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [selectedAmount, setSelectedAmount] = useState(1);

  useEffect(() => {
    // API call to fetch user's added ingredients
    const fetchIngredients = async () => {
      try {
        const response = await fetch('/ingredients-api/ingredients');
        const data = await response.json();
        setIngredients(data);
      } catch (error) {
        console.error('Error fetching data from API:', error);
      }
    };
    fetchIngredients();
  }, []);

  const handleAdd = async (ingredient) => {
    // API call to add ingredient to user's inventory
    try {
      const response = await fetch('/ingredients-api/ingredients', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(ingredient),
      });
      const data = await response.json();
      setIngredients([...ingredients, data]);
      setSelectedAmount(1);
    } catch (error) {
      console.error('Error adding ingredient:', error);
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
    setSearchTerm(event.target.value);
    try {
      const response = await fetch(`/ingredients-api/ingredients/search?q=${event.target.value}`);
      const data = await response.json();
      setSearchResults(data);
    } catch (error) {
      console.error('Error fetching data from API:', error);
    }
  };

  return (
    <div>
      <h1>My Ingredients Page</h1>
      <h2>Added Ingredients</h2>
      <ul>
        {Array.isArray(ingredients) && ingredients.map((ingredient) => (
          <li key={ingredient.id}>
            {ingredient.name} ({ingredient.amount})
          </li>
        ))}
      </ul>
      <h2>Search and Add Ingredients</h2>
      <div>
        <input
          type="text"
          value={searchTerm}
          onChange={handleSearch}
          placeholder="Search for ingredients..."
        />
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
