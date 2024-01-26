import React, { useState } from "react";
import axios from 'axios';
import {useCookies} from 'react-cookie'

const Auth = () => {
  const [isLogIn, setIsLogIn] = useState(true)

  const [message, setMessage] = useState(null)
  const [errorMessage, setErrorMessage] = useState(null)

  const [cookies, setCookies, removeCookies] = useCookies(null)

  const [email, setEmail] = useState(null)
  const [password, setPassword] = useState(null)
  const [confirmPassword, setConfirmPassword] = useState(null)

  function viewLogIn(status){
    setIsLogIn(status)
    setErrorMessage(null)
  }

  // SIGN UP
  async function handleSubmit(e, endpoint){
    setErrorMessage(null)
    setMessage(null)
    e.preventDefault()
    if (!isLogIn && password !== confirmPassword){
      setErrorMessage("The passwords you entered don't match")
    } else {
      try {
        const response = await axios.post(`${process.env.REACT_APP_SERVER_URL}/users/${endpoint}`,
         {email: email, password: password},
          {
            headers: { 'Content-Type': 'application/json' },
          })

        if (response.data.detail){
          setMessage(null)
          setErrorMessage(response.data.detail)
        } else {
          setMessage('User created successfully!')

          setCookies('Email', response.data.email)
          setCookies('AuthToken', response.data.token)

          window.location.reload()
        }

      } catch (error) {
        console.error(error);
      }
    }
  }

  

  return (
    <div className="auth-container">
      <div className="auth-container-box">
      <h2>{isLogIn ? 'Please log in' : 'Please sign up'}</h2>
        <form>
          <input value={email}  onChange={(e) => setEmail(e.target.value)} type="email" placeholder="email"/>
          <input value={password}  onChange={(e) => setPassword(e.target.value)} type="password" placeholder="password"/>
          {!isLogIn && <input value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} type="password" placeholder="confirm password"/>}
          <button className='auth_submit_button' onClick={(e) => handleSubmit(e, isLogIn ? 'login' : 'signup')} type="submit">Submit</button>
          {errorMessage && <p style={{color: 'red'}}>{errorMessage}</p>}
          {message && <p style={{color: 'green'}}>{message}</p>}
        </form>
        <div className="auth_options">
          <div>
            <button style={isLogIn ? {backgroundColor: 'rgb(174, 194, 255)'} : {backgroundColor: 'white'}} className="auth_button" onClick={()=> viewLogIn(true)}>Log in</button>
            <button style={!isLogIn ? {backgroundColor: 'rgb(174, 194, 255)'} : {backgroundColor: 'white'}} className="auth_button" onClick={()=> viewLogIn(false)}>Sign up</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Auth;
