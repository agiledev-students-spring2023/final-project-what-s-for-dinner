import React, { useState } from "react";

const SortBy = ({
  sortByIngredients,
  setSortByIngredients,
  sortByDifficulty,
  setSortByDifficulty,
  sortByTimeNeeded,
  setSortByTimeNeeded
}) => {
  return (
    <div>
      <label htmlFor="ingredients">Ingredients</label>
      <input
        type="checkbox"
        id="ingredients"
        checked={sortByIngredients}
        onChange={() => setSortByIngredients(!sortByIngredients)}
      />

      <label htmlFor="difficulty">Difficulty</label>
      <input
        type="checkbox"
        id="difficulty"
        checked={sortByDifficulty}
        onChange={() => setSortByDifficulty(!sortByDifficulty)}
      />

      <label htmlFor="timeNeeded">Time Needed</label>
      <input
        type="checkbox"
        id="timeNeeded"
        checked={sortByTimeNeeded}
        onChange={() => setSortByTimeNeeded(!sortByTimeNeeded)}
      />
    </div>
  );
};

export default SortBy;

