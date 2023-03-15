import React from "react"
import "./PrimaryNav.css"
import { Link } from "react-router-dom"

const PrimaryNav = props => {
  // we assume a function named setuser is passed as a prop to this component

  // show a login link if the user is not yet logged in
  let logInOutComponent = <Link to="/login">Login</Link>
  // show a logout link if the user is already logged in
  if (props.user.success)
    logInOutComponent = (
      <>
        <Link to="/logout">Logout {props.user.username}</Link>
      </>
    )

  return (
    <nav>
      <Link to="/">Home</Link>
      <Link to="/menuoverlay">Menu Overlay</Link>
      <Link to="/recipes">Search Recipes</Link>
      {logInOutComponent}
    </nav>
  )
  
}

export default PrimaryNav
