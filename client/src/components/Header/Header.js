import { Link } from "react-router-dom"
import React  from 'react';

const Header = ({ title }) => {
  
  return (
    <div className='navbar navbar-dark bg-dark'>
      <h1 style={{color:"white"}}>{title}</h1>

      <Link className="navbar-brand nav-ref" to="/dashboard">Dashboard</Link>
      <Link className="navbar-brand nav-ref" to="/statistics">Statistics</Link>
      <Link className="navbar-brand nav-ref" to="/organization">Organization</Link>
      <Link className="navbar-brand nav-ref" to="/login">Login</Link>
      <Link className="navbar-brand nav-ref" to="/about">About</Link>
      
    </div>
  )
}
export default Header
