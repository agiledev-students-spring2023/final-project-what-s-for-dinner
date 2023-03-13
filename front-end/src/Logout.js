import React, { useEffect } from "react"
import { Navigate } from "react-router-dom"
// import logo from './logo.svg';

const Logout = props => {
  // log the user out by setting the user to a blank object
  // we assume that a setuser function has been passed as a prop to this component
  useEffect(() => {
    props.setuser({}) // set the user data to a blank object
  }, [])

  // redirect the user to the home screen
  return <Navigate to="/" />
}

export default Logout
