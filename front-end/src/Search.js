// src/components/Search.js
import React from 'react';
import './Search.css';

const Search = ({ onSearch }) => {
  const handleSearch = (e) => {
    onSearch(e.target.value);
  };

  return (
    <div className="search-container">
      <input
        type="text"
        placeholder="Search ingredients..."
        onChange={handleSearch}
        className="search-input"
      />
      <button className="search-button">Search</button>
    </div>
  );
};

export default Search;