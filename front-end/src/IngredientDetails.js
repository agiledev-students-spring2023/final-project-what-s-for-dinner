// src/components/IngredientDescription.js
import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

const IngredientDescription = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [quantity, setQuantity] = useState(1);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await fetch(`https://fakestoreapi.com/products/${id}`);
        const data = await response.json();
        setProduct(data);
      } catch (error) {
        console.error('Error fetching data from Fake Store API:', error);
      }
    };
    fetchProduct();
  }, [id]);

  const increaseQuantity = () => {
    setQuantity(quantity + 1);
  };

  const decreaseQuantity = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1);
    }
  };

  const handleConfirm = () => {
    alert(`You selected ${quantity} of ${product.title}`);
  };

  if (!product) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <img src={product.image} alt={product.title} />
      <h2>{product.title}</h2>
      <div>
        <button onClick={decreaseQuantity}>-</button>
        <span>{quantity}</span>
        <button onClick={increaseQuantity}>+</button>
      </div>
      <button onClick={handleConfirm}>Confirm</button>
    </div>
  );
};

export default IngredientDescription;
