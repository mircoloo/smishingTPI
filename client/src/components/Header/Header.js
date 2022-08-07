import { Link } from "react-router-dom"
import React  from 'react';
import './Header.css'

const Header = ({ title }) => {

  const toggle = () => {
    document.querySelector(".nav").classList.toggle("close")
    const links = document.getElementsByClassName("nav-link")
    
    for (let i = 0; i < links.length; i++) {
      links[i].classList.toggle("disappear")
    }
  }
  


  return (
    <div className='nav'>
      <header>
      <h1 className='nav-title'>{title}</h1>
      
        <i class='bx bx-arrow-to-right toggle' onClick={toggle}></i>
      </header>
      
      <div className="nav-refs">
        <ul>
          <li className='nav-ref'><i class='bx bxs-dashboard'></i><Link className="nav-link" to="/dashboard">Dashboard</Link></li>
          <li className='nav-ref'><i class='bx bx-link'></i><Link className="nav-link" to="/statistics">Statistics</Link></li>
          <li className='nav-ref'><i class='bx bxs-group' ></i><Link className="nav-link" to="/organization">Organization</Link></li>
          <li className='nav-ref'><i class='bx bx-log-in' ></i><Link className="nav-link" to="/login">Login</Link></li>
          <li className='nav-ref'><i class='bx bxs-help-circle' ></i><Link className="nav-link" to="/about">About</Link></li>
        </ul>
        </div>
      
      
      
      
      

    </div>
  )
}
export default Header
