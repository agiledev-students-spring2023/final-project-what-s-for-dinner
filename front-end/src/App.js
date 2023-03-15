import React, { useState } from "react"
import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import PrimaryNav from "./PrimaryNav"
import Home from "./Home"
//import About from "./About"
import MenuOverlay from "./MenuOverlay"
import Recipes from "./Recipes"
// import IngredientDetails from "./IngredientDetails"
import RecipeDetails from "./RecipeDetails"
import Login from "./Login"
import Register from "./Register"
import RestorePassword from "./RestorePassword"
import Logout from "./Logout"
import "./App.css"
import ContactUs from "./ContactUs";
import RightsReserved from "./RightsReserved";
import TermsOfService from "./TermsOfService";
import Footer from "./Footer";


// set up routes so different URL routes load up different main components
const App = props => {
  const [user, setUser] = useState({}) // a state variable that stores the logged-in user, if any

  return (
    <div className="container">
      <Router>
        {/* pass the setter function that can be called if the user successfully logs in from the login screen */}
        <PrimaryNav user={user} setuser={setUser} />
        <Footer user={user} setuser={setUser} />
        <Routes>
          {/* a route to the home screen */}
          <Route path="/" element={<Home user={user} />} />

          {/* a route to the menu overlay */}
          <Route path="/menuoverlay" element={<MenuOverlay user={user} />} />

          {/* a route to show a list of recipes - we pass the user data in as a prop */}
          <Route path="/recipes" element={<Recipes user={user} />} />

          {/* a route to show the details of a specific recipe, given its id - we pass the user data in as a prop and the recipeId is passed in automatically as a param by react */}
          <Route
            path="/recipes/:recipeID" element={<RecipeDetails user={user} />}
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
          <Route path="/allrightsresereved" element={<RightsReserved user={user} />} />

          {/* a route to terms of service */}
          <Route path="/termsofservice" element={<TermsOfService user={user} />} />

          {/* a route to the contact us */}
          <Route path="/contactus" element={<ContactUs user={user} />} />

          {/* a route to the restore password form */}
          <Route
            path="/restorepassword"
            element={<RestorePassword user={user} setuser={setUser} />}
          />

          {/* a route to logout */}
          <Route
            path="/logout"
            element={<Logout user={user} setuser={setUser} />}
          />
        </Routes>
      </Router>
    </div>
  )
}

export default App;