import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Search from './Search';
import './Home.css';

const Home = () => {
  const [products, setProducts] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch('https://fakestoreapi.com/products');
        const data = await response.json();
        setProducts(data);
      } catch (error) {
        console.error('Error fetching data from Fake Store API:', error);
      }
    };
    fetchProducts();
  }, []);

  const filteredProducts = products.filter((product) =>
    product.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div>
      <h1>Home Page</h1>
      <nav>
        <ul>
            <Link to="/my-ingredients">My Ingredients Page</Link>
            <Link to="/Utensils">My Utensils Page</Link>
        </ul>
      </nav>
      <Search onSearch={setSearchTerm} />
      <div className="products-container">
      {filteredProducts.map((product) => (
          <div key={product.id} className="product">
            <Link to={`/ingredient-description/${product.id}`}>
              <img src={product.image} alt={product.title} className="product-image" />
              <h3>{product.title}</h3>
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Home;