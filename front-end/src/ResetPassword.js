import React, { useState, useEffect } from "react"
import { Link, Navigate, useSearchParams } from "react-router-dom"
import axios from "axios"
// import logo from './logo.svg';
import "./ResetPassword.css"

const ResetPassword = props => {
  let [urlSearchParams] = useSearchParams() // get access to the URL query string parameters

  // create state variables to hold username and password
  const [status, setStatus] = useState({}) // the API will return an object indicating the login status in a success field of the response object
  const [errorMessage, setErrorMessage] = useState(``) // will contain any error message that explains why the user was redirected to this page.
  const [showPopup, setShowPopup] = useState(false)

  // if the user got here by trying to access our Protected page, there will be a query string parameter called 'error' with the value 'protected'
  useEffect(() => {
    const qsError = urlSearchParams.get("error") // get any 'error' field in the URL query string
    if (qsError === "protected")
      setErrorMessage(
        "Please log in to view your home page."
      )
  }, [urlSearchParams])

  const handleSubmit = async e => {
    // prevent the HTML form from actually submitting... we use React's javascript code instead
    e.preventDefault()

    try {
      // create an object with the data we want to send to the server
      const requestData = {
        username: e.target.username.value, // gets the value of the field in the submitted form with name='username'
        email: e.target.email.value, // gets the value of the field in the submitted form with name='password',
      }
      // send the request to the server api to authenticate
      const baseUrl = process.env.REACT_APP_SERVER;
      const response = await axios.post(
        `${baseUrl}/reset-password`,
        requestData
      )

      // store the response data into the data state variable
      console.log(response.data)
      setShowPopup(true)
      setStatus(response.data)
      //setShowPopup(true)
    } catch (err) {
      // throw an error
      console.error(err)
      setErrorMessage(err.response.data.message)
    }
  }

  const handlePopupClose = () => {
    setShowPopup(false)
    //props.navigate("/login")
  }

  return (
    <div className="ResetPassword">
      <h1>Reset Your Password</h1>
      {errorMessage ? <p className="error">{errorMessage}</p> : ""}
      <section className="main-content">
        <form onSubmit={handleSubmit}>
          {
            //handle error condition
          }
          <label>Registered Username: </label>
          <input type="text" name="username" placeholder="username" />
          <label>Registered Email: </label>
          <input type="text" name="email" placeholder="email" />
          <input type="submit" value="Restore Password" />
        </form>
        <p>
          <label>New user? </label>
          <br />
          <Link to="/register">Create an account</Link>
          <br />
          <br />
          <label>Remember Your Password? </label>
          <br />
          <Link to="/login">Log in</Link>
        </p>
      </section>
      {showPopup && (
        <div className="popup">
          <p>A new password has been sent to your registered email.</p>
          <button onClick={handlePopupClose}>Close</button>
        </div>
      )}
      {status.success && !showPopup && <Navigate to="/login" replace={true} />}
    </div>
  )
}

export default ResetPassword