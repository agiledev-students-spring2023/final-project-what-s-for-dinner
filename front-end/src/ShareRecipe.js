import React, { useState } from "react";
import "./ShareRecipe.css"

const ShareRecipe = () => {
  // Set up state variables to track form input
  const [title, setTitle] = useState("");
  // const [description, setDescription] = useState("");
  const [ingredients, setIngredients] = useState([]);
  const [instructions, setInstructions] = useState("");
  const [image, setImage] = useState(null);

  // Handle form submit
  const handleSubmit = async e => {
    e.preventDefault();
    // Create recipe object with form input
    const recipe = {
      title: title,
      ingredients: ingredients,
      instructions: instructions,
      image: image,
    };
    // Send recipe data


    const formData = new FormData();
    formData.append('title', title);
    formData.append('instructions', instructions);
    formData.append('ingredients', JSON.stringify(ingredients));
    formData.append('image', image);

    console.log(recipe);
    const response = await fetch('http://localhost:3000/share-recipes', {
        method: 'POST',
        body: formData
    });

    if(response.ok){
      console.log('Recipe submitted successfully!');
    }else {
      // handle error response
      console.error('Error submitting recipe:', response.statusText);
    }

    // Reset form input
    setTitle("");
    // setDescription("");
    setIngredients([]);
    setInstructions("");
    setImage(null);
  };

  // Handle ingredient input
  const handleIngredientInput = (e, index) => {
    const newIngredients = [...ingredients];
    newIngredients[index] = e.target.value;
    setIngredients(newIngredients);
  };

  // Handle adding new ingredient input field
  const handleAddIngredientField = () => {
    setIngredients([...ingredients, ""]);
  };

  // Handle uploading a picture of the recipe
  const handleImageUpload = (e) => {
    setImage(e.target.files[0]);
  };  

  // Render form for entering recipe information
  return (
    <form onSubmit={handleSubmit}>
      <label htmlFor="title">Title:</label>
      <input
        type="text"
        id="title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        required
      />

      {/* <label htmlFor="description">Description:</label>
      <textarea
        id="description"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        required
      ></textarea> */}

      <label htmlFor="ingredients">Ingredients:</label>
      {ingredients.map((ingredient, index) => (
        <input
          key={index}
          type="text"
          value={ingredient}
          onChange={(e) => handleIngredientInput(e, index)}
          required
        />
      ))}
      <button type="button" onClick={handleAddIngredientField}>
        Add Ingredient
      </button>

      <label htmlFor="instructions">Instructions:</label>
      <textarea
        id="instructions"
        value={instructions}
        onChange={(e) => setInstructions(e.target.value)}
        required
      ></textarea>

      <label htmlFor="image">Image:</label>
      <input
        type="file"
        id="image"
        accept=".jpg,.jpeg,.png"
        onChange={handleImageUpload}
        required
      />

      <button type="submit">Share Recipe</button>
    </form>
  );
};

export default ShareRecipe;
