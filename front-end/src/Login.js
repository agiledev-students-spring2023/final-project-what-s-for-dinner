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
  }, [])

  // if the user's logged-in status changes, call the setuser function that was passed to this component from the PrimaryNav component.
  useEffect(() => {
    // if the login was a success, call the setuser function that was passed to this component as a prop
    if (status.success) {
      console.log(`User successfully logged in: ${status.username}`)
      props.setuser(status)
    }
  }, [status])

  const handleSubmit = async e => {
    e.preventDefault()
  
    try {
      const requestData = {
        username: e.target.username.value,
        password: e.target.password.value,
      }
      const response = await axios.post("/auth/login", requestData) // send the request to the backend server
  
      console.log(response.data)
      setStatus(response.data)
    } catch (err) {
      console.error(err)
      setErrorMessage("An error occurred during login. Please try again.")
    }
  }
  

  // if the user is not logged in, show the login form
  if (!status.success)
    return (
      <div className="Login">
        <h1>Log in</h1>
        <p className="feedback">
          This page is placeholder only... without a back-end, we cannot support
          true login functionality. In this case, we fake a login request to a
          mock API and randomly allow the user in or not. Keep trying until you
          get in.
        </p>
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
            <Link to="/restorepassword">Restore Password</Link>
          </p>
        </section>
      </div>
    )
  // otherwise, if the user has successfully logged-in, redirect them to a different page
  // in this example, we simply redirect to the home page, but a real app would redirect 
  //to a page that shows content only available to logged-in users
  else return <Navigate to="/" />
}

export default Login