
import { useState } from 'react'


function App() {

  const [typeofuser, setTypeofuser] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  async function registerUser(event){
    event.preventDefault()
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
      alert('Registration succesful')
      //window.location.href = '/dashboard'
    }else{
      alert('User not valid')
    }
  }


  return ( 
 
  <div>
    <h1>Register</h1>
    <form onSubmit={registerUser}>
    <input type="radio" id="html" name="fav_language" value="User" onClick={(e) => setTypeofuser(e.target.value)}/><label htmlFor="html">User</label> <br />
    <input type="radio" id="html" name="fav_language" value="Organization" onClick={(e) => setTypeofuser(e.target.value)}/><label htmlFor="html">Organization</label> <br />
      <input  value={email} onChange={(e) => setEmail(e.target.value)} type="email"  placeholder="Email" /> <br />
      <input  value={password} onChange={(e) => setPassword(e.target.value)} type="password"  placeholder="Password" /> <br />
      <input type="submit" value="Register"/> 
    </form>
    </div>
  );
}

export default App;
