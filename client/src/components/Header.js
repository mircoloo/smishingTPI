import { Link } from "react-router-dom"

const Header = ({ title }) => {
  
  return (
    <header className='navbar navbar-dark bg-dark'>
      <h1 style={{color:"white"}}>{title}</h1>

      <Link className="navbar-brand nav-ref" to="/dashboard">Dashboard</Link>
      <Link className="navbar-brand nav-ref" to="/statistics">Statistics</Link>
      <Link className="navbar-brand nav-ref" to="/about">About</Link>
    </header>
  )
}
export default Header
