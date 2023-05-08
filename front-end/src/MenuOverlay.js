// src/components/MenuOverlay.js
import React from 'react';
import { Link } from 'react-router-dom';
import './MenuOverlay.css';

const MenuOverlay = ({ isOpen, closeMenu }) => {
  if (!isOpen) {
    return null;
  }

  return (
    <div className="menu-overlay" onClick={closeMenu}>
      <nav className="menu-overlay-nav">
        <ul>
          <li>
            <Link to="/register">Sign Up</Link>
          </li>
          <li>
            <Link to="/login">Login</Link>
          </li>
          <li>
            <Link to="/my-ingredients">My Ingredients</Link>
          </li>
          <li>
            <Link to="/my-utensils">My Utensils</Link>
          </li>
          <li>
            <Link to="/share-recipes">Share Your Recipes</Link>
          </li>
          <li>
            <Link to="/saved-recipes">Access Saved Recipes</Link>
          </li>
          <li>
            <Link to="/about-us">About Us</Link>
          </li>
        </ul>
      </nav>
    </div>
  );
};

export default MenuOverlay;
