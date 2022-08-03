
import React, { useState } from 'react'
import Register from './Register'
import './Login.css'

function App() {

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
      window.location.href = '/organization'
    }else{
      //.....
    }
  }
  return ( 
    <div className='auth-container'>
    { showRegister===true ? <div className="section"><Register  setShowRegister={setShowRegister}/></div> : 
    
      <div className="section"> <h1>Login</h1>
        <form onSubmit={loginUser}>
          <input  value={email} onChange={(e) => setEmail(e.target.value)} type="email"  placeholder="Email" /> <br />
          <input  value={password} onChange={(e) => setPassword(e.target.value)} type="password"  placeholder="Password" /> <br />
          <p className='sign-up-text' onClick={() => {setShowRegister(true)}}>Sign up</p>
          <input type="submit" value="Login"/> 
        </form>
      </div>
  
  
    }
  
     
   
    
    
  
    </div>
  );
}

export default App;
