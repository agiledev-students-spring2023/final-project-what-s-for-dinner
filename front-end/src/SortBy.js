import React from "react";

const SortBy = ({ handleSortChange }) => {
  return (
    <div>
      <label htmlFor="sortBy">Sort By:</label>
      <select id="sortBy" onChange={(event) => handleSortChange(event.target.value)}>
        <option value="">--Select--</option>
        <option value="similar">Similar</option>
        <option value="time">Time Needed</option>
      </select>

    </div>
  );
};

export default SortBy;

