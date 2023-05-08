import React, { useState, useEffect } from "react"
import { Link, Navigate, useSearchParams } from "react-router-dom"
import axios from "axios"
import "./Register.css"

const Register = (props) => {
  const [urlSearchParams] = useSearchParams() 
  const [status, setStatus] = useState({})
  const [errorMessage, setErrorMessage] = useState("")
  const [showPopup, setShowPopup] = useState(false);

  useEffect(() => {
    const qsError = urlSearchParams.get("error")
    if (qsError === "protected") {
      setErrorMessage("Please log in to view your home page.")
    }
  }, [urlSearchParams])

  const handleSubmit = async (e) => {
    e.preventDefault()

    try {
      const requestData = {
        email: e.target.email.value,
        username: e.target.username.value,
        password: e.target.password.value,
        passwordConfirm: e.target.confirmPassword.value,
      }
      const baseUrl = process.env.REACT_APP_SERVER;
      const response = await axios.post(`${baseUrl}/auth/register`, requestData)

      console.log(response.data)
      setStatus(response.data)
      setShowPopup(true)
    } catch (err) {
      console.error(err)
      setErrorMessage(err.response.data.message)
    }
  }

  const handlePopupClose = () => {
    setShowPopup(false)
  }

  return (
    <div className="Register">
      <h1>Create an account</h1>
      {errorMessage ? <p className="error">{errorMessage}</p> : ""}
      <section className="main-content">
        <form onSubmit={handleSubmit}>
          <label>Your Email: </label>
          <input type="text" name="email" placeholder="email@address.com" />
          <label>Preferred Username: </label>
          <input type="text" name="username" placeholder="username" />
          <label>Your Password: </label>
          <input type="password" name="password" placeholder="password" />
          <label>Confirm Your Password: </label>
          <input
            type="password"
            name="confirmPassword"
            placeholder="re-enter password"
          />
          <input type="submit" value="Create Account" />
        </form>
        <p>
          <label>Already Have An Account? </label>
          <br />
          <Link to="/login">Log in</Link>
        </p>
      </section>
      {/* Popup window */}
      {showPopup && (
        <div className="popup">
          <p>User created successfully.</p>
          <button onClick={handlePopupClose}>Close</button>
        </div>
      )}
      {status.success && !showPopup && <Navigate to="/login" replace={true} />}
    </div>
  )
}

export default Register