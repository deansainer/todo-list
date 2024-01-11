import React, { useState } from "react";

const Auth = () => {
  const [isLogIn, setIsLogIn] = useState(true)

  const [error, setError] = useState(null)

  function viewLogIn(status){
    setIsLogIn(status)
    setError(null)
  }

  return (
    <div className="auth-container">
      <div className="auth-container-box">
      <h2>{isLogIn ? 'Please log in' : 'Please sign up'}</h2>
        <form>
          <input type="email" placeholder="email"/>
          <input type="password" placeholder="password"/>
          {!isLogIn && <input type="password" placeholder="confirm password"/>}
          <input className="create" type="submit" />
          {error && <p>{error}</p>}
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
