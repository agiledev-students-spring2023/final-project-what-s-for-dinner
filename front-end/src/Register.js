import React, { useState, useEffect } from "react"
import { Link, Navigate, useSearchParams } from "react-router-dom"
import axios from "axios"
import "./Register.css"

const Register = (props) => {
  const [urlSearchParams] = useSearchParams() 
  const [status, setStatus] = useState({})
  const [errorMessage, setErrorMessage] = useState("")

  useEffect(() => {
    const qsError = urlSearchParams.get("error")
    if (qsError === "protected") {
      setErrorMessage("Please log in to view your home page.")
    }
  }, [urlSearchParams])

  useEffect(() => {
    if (status.success) {
      console.log(`User successfully logged in: ${status.username}`)
      props.setuser(status)
    }
  }, [status, props])

  const handleSubmit = async (e) => {
    e.preventDefault()

    try {
      const requestData = {
        email: e.target.email.value,
        username: e.target.username.value,
        password: e.target.password.value,
        passwordConfirm: e.target.confirmPassword.value,
      }

      const response = await axios.post("/auth/register", requestData)

      console.log(response.data)
      setStatus(response.data)
    } catch (err) {
      console.error(err)
      setErrorMessage("Something went wrong, please try again later.")
    }
  }

  return (
    <div className="Register">
      <h1>Create an account</h1>
      <p className="feedback">
        This page is a placeholder only... without a back-end, we cannot support true
        register functionality. In this case, we fake a register request to a mock API
        and randomly allow the user in or not. Keep trying until you get in.
      </p>
      {errorMessage && <p className="error">{errorMessage}</p>}
      {!status.success && (
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
      )}
      {status.success && <Navigate to="/home" />}
    </div>
  )
}

export default Register