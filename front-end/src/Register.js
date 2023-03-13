import React, { useState, useEffect } from "react"
import { Link, Navigate, useSearchParams } from "react-router-dom"
import axios from "axios"
// import logo from './logo.svg';
import "./Register.css"

const Register = props => {
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
    // prevent the HTML form from actually submitting... we use React's javascript code instead
    e.preventDefault()

    try {
      // create an object with the data we want to send to the server
      const requestData = {
        email: e.target.email.value,
        username: e.target.username.value,
        password: e.target.password.value,
        confirmPassword: e.target.confirmPassword.value,
      }
      // send the request to the server api to authenticate
      const response = await axios.post(
        "https://my.api.mockaroo.com/login.json?key=d9ddfc40",
        requestData
      )

      // store the response data into the data state variable
      console.log(response.data)
      setStatus(response.data)
    } catch (err) {
      // throw an error
      throw new Error(err)
    }
  }

  // if the user is not registered, show the register form
  if (!status.success)
    return (
      <div className="Register">
        <h1>Create an account</h1>
        <p className="feedback">
          This page is placeholder only... without a back-end, we cannot support
          true register functionality. In this case, we fake a register request to a
          mock API and randomly allow the user in or not. Keep trying until you
          get in.
        </p>
        {errorMessage ? <p className="error">{errorMessage}</p> : ""}
        <section className="main-content">
          <img alt="register!" src="https://picsum.photos/200?page=home" />
          <form onSubmit={handleSubmit}>
            {
              //handle error condition
            }
            <label>Your Email: </label>
            <br />
            <input type="text" name="email" placeholder="email@address.com" />
            <br />
            <label>Preferred Username: </label>
            <br />
            <input type="text" name="username" placeholder="username" />
            <br />
            <label>Your Password: </label>
            <br />
            <input type="password" name="password" placeholder="password" />
            <br />
            <label>Confirm Your Password: </label>
            <br />
            <input type="text" name="password" placeholder="re-enter password" />
            <br />
            <input type="submit" value="Create Account" />
          </form>
          <p>
            <label>Already Have An Account? </label>
            <br />
            <Link to="/login">Log in</Link>
          </p>
        </section>
      </div>
    )
  // if the user has successfully registered, redirect them to the login page
  else return <Navigate to="/home" />
}

export default Register