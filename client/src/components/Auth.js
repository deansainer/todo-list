import React, { useState } from "react";
import axios from 'axios';

const Auth = () => {
  const [isLogIn, setIsLogIn] = useState(true)
  const [message, setMessage] = useState(null)
  const [error, setError] = useState(null)
  const [email, setEmail] = useState(null)
  const [password, setPassword] = useState(null)
  const [confirmPassword, setConfirmPassword] = useState(null)

  function viewLogIn(status){
    setIsLogIn(status)
    setError(null)
  }

  async function signUp(e){
    setError(null)
    setMessage(null)
    e.preventDefault()
    if (!isLogIn && password !== confirmPassword){
      setError("The passwords you entered don't match")
    } else{
      try {
        const response = await axios.post('http://localhost:8000/api/users',
         {email: email, password: password},
          {
            headers: { 'Content-Type': 'application/json' },
          })
        if (response.status === 200){
          setMessage('User created successfully!')
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
          <button onClick={signUp} type="submit">Submit</button>
          {error && <p style={{color: 'red'}}>{error}</p>}
          {message && <p style={{color: 'green'}}>{message}</p>}
        </form>
        <div className="auth_options">
          <div>
            <button style={{margin:'2%'}} className="auth_button" onClick={()=> viewLogIn(true)}>Log in</button>
            <button className="auth_button" onClick={()=> viewLogIn(false)}>Sign up</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Auth;
