import React, { useState } from "react"
import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import PrimaryNav from "./PrimaryNav"
import Welcome from "./Welcome"
import Home from "./Home"
import MenuOverlay from "./MenuOverlay"
import RecipeList from "./RecipeList"
import Utensils from "./Utensils"
import RecipeDetails from "./RecipeDetails"
import Search from "./Search" 
import Login from "./Login"
import Register from "./Register"
import ResetPassword from "./ResetPassword"
import Logout from "./Logout"
import "./App.css"
import ContactUs from "./ContactUs";
import RightsReserved from "./RightsReserved";
import TermsOfService from "./TermsOfService";
import Footer from "./Footer";
import ShareRecipe from "./ShareRecipe"
import MyIngredients from "./MyIngredients"
import SavedRecipes from "./SavedRecipes"
import AboutUs from "./AboutUs";


// set up routes so different URL routes load up different main components
const App = props => {
  const [user, setUser] = useState({}) // a state variable that stores the logged-in user, if any
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const closeMenu = () => {
    setIsMenuOpen(false);
  };

  return (
    <div className="container">
      <Router>

      <MenuOverlay isOpen={isMenuOpen} closeMenu={closeMenu} />
      <button onClick={toggleMenu} className="menu-button">
        Menu
      </button>

        {/* pass the setter function that can be called if the user successfully logs in from the login screen */}
        <PrimaryNav user={user} setuser={setUser} />
        
        <Routes>
          {/* a route to the welcome screen */}
          <Route path="/" element={<Welcome user={user} />} />

          {/* a route to the welcome screen */} 
          <Route path="/home" element={<Home user={user} />} />

          {/* a route to the user's ingredients page */}
          <Route path="/my-ingredients" element={<MyIngredients user={user} />} /> 

          {/* a route to the user's utensils page */}
          <Route path="/my-utensils" element={<Utensils user={user} />} />

          {/* a route to the user's saved recipes page */}
          <Route path="/saved-recipes" element={<SavedRecipes user={user} />} /> 

          {/* a route to show a list of recipes - we pass the user data in as a prop */}

           <Route path="/recipes" element={<RecipeList user={user} />} />

          {/* <Route path="/recipes" element={<Recipes user={user} />} /> */}

          {/* a route to show the details of a specific recipe, given its id - we pass the user data in as a prop and the recipeId is passed in automatically as a param by react */}
          <Route
            path="/:recipeId" element={<RecipeDetails user={user} />}
          />
          {/* a route to the search page for recipes */}
          <Route
            path="/search" element={<Search user={user} />}
          />
          {/* a route to the share recipe page */}
          <Route
            path="/share-recipes" element={<ShareRecipe user={user} />}
          />
          {/* a route to utensils page */}
          <Route 
            path="/utensils" element={<Utensils user={user} setuser={setUser} />}
          />
          {/* a route to the log in form */}
          <Route
            path="/login" element={<Login user={user} setuser={setUser} />}
          />
          {/* a route to the register form */}
          <Route
            path="/register" element={<Register user={user} setuser={setUser} />}
          />
          {/* a route to all rights reserved */}
          <Route path="/allrightsreserved" element={<RightsReserved user={user} />} />

          {/* a route to terms of service */}
          <Route path="/termsofservice" element={<TermsOfService user={user} />} />

          {/* a route to the contact us */}
          <Route path="/contactus" element={<ContactUs user={user} />} />

          {/* a route to the user's saved recipes page */}
          <Route path="/about-us" element={<AboutUs user={user} />} /> 

          {/* a route to the restore password form */}
          <Route
            path="/reset-password"
            element={<ResetPassword user={user} setuser={setUser} />}
          />

          {/* a route to logout */}
          <Route
            path="/logout"
            element={<Logout user={user} setuser={setUser} />}
          />
        </Routes>
        <Footer user={user} setuser={setUser} />
      </Router>
    </div>
  )
}

export default App;