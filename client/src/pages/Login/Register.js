
import React, { useState } from 'react'


function App({setShowRegister}) {

  const [typeofuser, setTypeofuser] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  async function registerUser(event){
    event.preventDefault()

    if(typeofuser !== '' && email !== '' && password !== ''){
      const response = await fetch('api/auth/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email, 
          password,
          typeofuser
        })
        })
    
        const data = await response.json()
        if(data.success){
          setShowRegister(false)
          
        }else{
          alert('User not valid')
        }
      }
    }
    
  


  return ( 
 
  <div>
    <h1>Register</h1>
    <form onSubmit={registerUser}>
    
      <input type="radio" name='type-acc' value="User" defaultChecked onClick={(e) => setTypeofuser(e.target.value)}/><label htmlFor="html">User</label> <br />
    <input type="radio"  value="Organization"   name='type-acc' onClick={(e) => setTypeofuser(e.target.value)}/><label htmlFor="html">Organization</label> <br />
      
    


      <input  value={email} onChange={(e) => setEmail(e.target.value)} type="email"  placeholder="Email" /> <br />
      <input  value={password} onChange={(e) => setPassword(e.target.value)} type="password"  placeholder="Password" /> <br />
      <input type="submit" value="Register"/> 
    </form>
    </div>
  );
}

export default App;
