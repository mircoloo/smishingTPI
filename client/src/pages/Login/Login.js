
import { useState } from 'react'
import Register from './Register'
import './Login.css'

function App() {

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState(false)

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
    if(data.email){
      window.location.href = '/organization'
      localStorage.setItem('token', data.token)
    }else{
      //.....
    }



  }
  return ( 
 
  <div className='auth-container'>
     <div className="section"> <h1>Login</h1>
    <form onSubmit={loginUser}>
      <input  value={email} onChange={(e) => setEmail(e.target.value)} type="email"  placeholder="Email" /> <br />
      <input  value={password} onChange={(e) => setPassword(e.target.value)} type="password"  placeholder="Password" /> <br />
      <input type="submit" value="Login"/> 
      <button onClick={() => window.localStorage.clear()}>LogOut</button>
    </form>
    </div>
   
    <div className="section"><Register /></div>
    
  
    </div>
  );
}

export default App;
