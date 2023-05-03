import React, { useState, useEffect } from "react"
import { Link, Navigate, useSearchParams } from "react-router-dom"
import axios from "axios"
// import logo from './logo.svg';
import "./Login.css"

const Login = props => {
  let [urlSearchParams] = useSearchParams() // get access to the URL query string parameters
  // create state variables to hold username and password
  const [status, setStatus] = useState({}) // the API will return an object indicating the login status in a success field of the response object
  const [errorMessage, setErrorMessage] = useState(``) // will contain any error message that explains why the user was redirected to this page.

  // if the user got here by trying to access our Protected page, there will be a query string parameter called 'error' with the value 'protected'
  useEffect(() => {
    const qsError = urlSearchParams.get("error") // get any 'error' field in the URL query string
    if (qsError === "protected")
      setErrorMessage(
        "Please log in to view your home page."
      )
  }, [urlSearchParams])

  // if the user's logged-in status changes, call the setuser function that was passed to this component from the PrimaryNav component.
  useEffect(() => {
    // if the login was a success, call the setuser function that was passed to this component as a prop
    if (status.success) {
      console.log(`User successfully logged in: ${status.username}`)
      props.setuser(status)
    }
  }, [status, props])

  const handleSubmit = async e => {
    e.preventDefault()
    const baseUrl = process.env.REACT_APP_SERVER;
    try {
      const requestData = {
        username: e.target.username.value,
        password: e.target.password.value,
      }
      const response = await axios.post(`${baseUrl}/auth/login`, requestData) // send the request to the backend server
  
      console.log(response.data)
      setStatus(response.data)
    } catch (err) {
      console.error(err)
      setErrorMessage(err.response.data.message)
    }
  }
  

  // if the user is not logged in, show the login form
  if (!status.success)
    return (
      <div className="Login">
        <h1>Log in</h1>
        {errorMessage ? <p className="error">{errorMessage}</p> : ""}
        <section className="main-content">
          <form onSubmit={handleSubmit}>
            {
              //handle error condition
            }
            <label>Username: </label>
            <input type="text" name="username" placeholder="username" />
            <label>Password: </label>
            <input type="password" name="password" placeholder="password" />
            <input type="submit" value="Log In" />
          </form>
          <p>
            <label>New user? </label>
            <br />
            <Link to="/register">Create an account</Link>
            <br />
            <br />
            <label>Forgot Password? </label>
            <br />
            <Link to="/reset-password">Restore Password</Link>
          </p>
        </section>
      </div>
    )
  // otherwise, if the user has successfully logged-in, redirect them to a different page
  // in this example, we simply redirect to the home page, but a real app would redirect 
  //to a page that shows content only available to logged-in users
  else return <Navigate to="/home" />
}

export default Login