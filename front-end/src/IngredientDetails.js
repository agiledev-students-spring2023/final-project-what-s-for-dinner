// src/components/IngredientDescription.js
import React, { useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import Ingredient from './Ingredient'

const IngredientDescription = () => {
  const { id } = useParams();
  const [ingredient, setIngredient] = useState([]);
  // const [quantity, setQuantity] = useState(1);
  const YOUR_API_KEY = "bff4a3b5c9944aca81e2b41246450fdb";

  // useEffect(() => {
  //   const fetchProduct = async () => {
  //     try {
  //       const response = await fetch(`https://api.spoonacular.com/food/ingredients/${id}/information?apiKey=${YOUR_API_KEY}`);
  //       const data = await response.json();
  //       setProduct(data);
  //     } catch (error) {
  //       console.error('Error fetching data from API:', error);
  //     }
  //   };
  //   fetchProduct();
  // }, [id]);

  // const increaseQuantity = () => {
  //   setQuantity(quantity + 1);
  // };

  // const decreaseQuantity = () => {
  //   if (quantity > 1) {
  //     setQuantity(quantity - 1);
  //   }
  // };

  // const handleConfirm = () => {
  //   alert(`You selected ${quantity} of ${product.title}`);
  // };

  // if (!product) {
  //   return <div>Loading...</div>;
  // }

  const getIngredient = async () => {
    const response = await fetch (`https://api.spoonacular.com/food/ingredients/${id}/information?apiKey=${YOUR_API_KEY}`);
    const data = await response.json();
    setIngredient(data);
    // console.log(ingredient);
    // console.log(data);
  }

  useEffect(() =>{
    getIngredient();
  }, [id]);

  return (
    <div>
      <h2>pinapples</h2>

      {/* <Ingredient data = {ingredient} /> */}

      {/* <h3>{response.name}</h3> */}
      {/* <img src={product.image} alt={product.name} />
      <h2>{product.name}</h2>
      <p>{product.description}</p>
      <p>Calories: {product.nutrition.caloricAmount}</p>
      <div>
        <button onClick={decreaseQuantity}>-</button>
        <span>{quantity}</span>
        <button onClick={increaseQuantity}>+</button>
      </div>
      <button onClick={handleConfirm}>Confirm</button>
      <Link to={`/my-ingredients/${id}`}>Add to My Ingredients</Link> */}
    </div>
  );
};

export default IngredientDescription;
