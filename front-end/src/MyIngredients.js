import React, { useState, useEffect } from 'react';
import "./MyIngredients.css"

const MyIngredients = () => {
  const [ingredients, setIngredients] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const YOUR_API_KEY = "c7fc815cea624244bc3e8c2f06826c4b";

  useEffect(() => {
    // API call to fetch user's added ingredients
    const fetchIngredients = async () => {
      try {
        const response = await fetch(`https://api.spoonacular.com/ingredients/list?apiKey=${YOUR_API_KEY}`);
        const data = await response.json();
        setIngredients(data);
      } catch (error) {
        console.error('Error fetching data from API:', error);
      }
    };
    fetchIngredients();
  }, []);

  useEffect(() => {
    // API call to fetch search results for ingredient search term
    const fetchSearchResults = async () => {
      try {
        const response = await fetch(`https://api.spoonacular.com/food/ingredients/search?apiKey=${YOUR_API_KEY}&query=${searchTerm}`);
        const data = await response.json();
        setSearchResults(data.results);
      } catch (error) {
        console.error('Error fetching data from API:', error);
      }
    };
    fetchSearchResults();
  }, [searchTerm]);

  const handleAdd = (ingredient) => {
    // API call to add ingredient to user's inventory
    setIngredients([...ingredients, ingredient]);
  };

  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
  };

  return (
    <div>
      <h1>My Ingredients Page</h1>
      <h2>Added Ingredients</h2>
      <ul>
        {ingredients.map((ingredient) => (
          <li key={ingredient.id}>
            {ingredient.name} ({ingredient.amount})
          </li>
        ))}
      </ul>
      <h2>Search and Add Ingredients</h2>
      <div>
        <input type="text" value={searchTerm} onChange={handleSearch} placeholder="Search for ingredients..." />
        <button onClick={handleSearch}>Search</button>
      </div>
      <ul>
        {searchResults.map((ingredient) => (
          <li key={ingredient.id}>
            {ingredient.name}
            <button onClick={() => handleAdd({ name: ingredient.name, amount: 1 })}>Add</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default MyIngredients;
