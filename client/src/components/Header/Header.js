import { Link } from "react-router-dom"
import React  from 'react';

const Header = ({ title }) => {
  
  return (
    <div className='navbar'>
      <header>{title}</header>
      <div className="nav-refs">
        <ul>
          <li><Link className="nav-ref" to="/dashboard"><i className="fa fa-cloud"></i>Dashboard</Link></li>
          <li><Link className="nav-ref" to="/statistics">Statistics</Link></li>
          <li><Link className="nav-ref" to="/organization">Organization</Link></li>
          <li><Link className="nav-ref" to="/login">Login</Link></li>
          <li><Link className="nav-ref" to="/about">About</Link></li>
        </ul>
      
      
      
      
      
      </div>

    </div>
  )
}
export default Header
