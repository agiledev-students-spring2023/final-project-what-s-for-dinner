import React, { useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import './MyIngredients.css';

const MyIngredients = () => {
  const [ingredients, setIngredients] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [selectedAmount, setSelectedAmount] = useState(1);
  const YOUR_API_KEY = "bff4a3b5c9944aca81e2b41246450fdb";

  useEffect(() => {
    // API call to fetch user's added ingredients
    const fetchIngredients = async () => {
      try {
        const response = await fetch(
          `https://api.spoonacular.com/ingredients/list?apiKey=${YOUR_API_KEY}`
        );
        const data = await response.json();
        setIngredients(data);
      } catch (error) {
        console.error('Error fetching data from API:', error);
      }
    };
    fetchIngredients();
  }, []);

  const handleAdd = (ingredient) => {
    // API call to add ingredient to user's inventory
    setIngredients([...ingredients, ingredient]);
    setSelectedAmount(1);
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
      const response = await fetch(
        `https://api.spoonacular.com/food/ingredients/search?apiKey=${YOUR_API_KEY}&query=${event.target.value}`
      );
      const data = await response.json();
      setSearchResults(data.results);
    } catch (error) {
      console.error('Error fetching data from API:', error);
    }
  };

  return (
    <div>
      <h1>My Ingredients Page</h1>
      <h2>Added Ingredients</h2>
      <ul>
        {ingredients.map((ingredient) => (
          <li key={ingredient.id}>
            <Link to={`/ingredientdetails/${ingredient.id}`}>
              {ingredient.name} ({ingredient.amount})
            </Link>
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
