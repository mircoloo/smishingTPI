
import React, { useState } from 'react'
import Register from './Register'
import './Login.css'

const Login = ({changeLogStatus}) => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [showRegister, setShowRegister] = useState(false)
  const loginUser = async (event) => {
    event.preventDefault();

    const response = await fetch('/api/auth/login', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      email, 
      password
    })
    })
    const data = await response.json()
    if(data.user){
      localStorage.setItem('token', data.user.token)
      changeLogStatus()
      window.location.href = '/organization'
    }else{
      document.querySelector('.login-form').style.borderColor = "red"
    }
  }
  return ( 
    <div className='page'>
    { showRegister===true ? <div className="section"><Register  setShowRegister={setShowRegister}/></div> : 
    
      <div className="section"> 
        <form className='login-form form' onSubmit={loginUser}>
      <h1 className='page-title'>Login</h1>
      <div className='inputs'>
          <input className='input-text'  value={email} onChange={(e) => setEmail(e.target.value)} type="email"  placeholder="Email" /> <br />
          <input className='input-text' value={password} onChange={(e) => setPassword(e.target.value)} type="password"  placeholder="Password" /> <br />
      </div>
          
          <p className='sign-up-text switch-form-text' onClick={() => {setShowRegister(true)}}>Sign up</p>
          <input className='btn' type="submit" value="Login"/> 
        </form>
      </div>
  
  
    }
  
     
   
    
    
  
    </div>
  );
}

export default Login;
