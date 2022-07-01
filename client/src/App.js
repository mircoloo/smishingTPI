import React from 'react'
import { Route, Routes} from 'react-router-dom'
import Dashboard from './pages/Dashboard'
import Header from './components/Header'
import Statistics from './pages/Statistics'
import About from './pages/About'

const App = () => {
    return (
       <>
        <Header title={"Smishing TIP"}/>
        <div className='container bg-light'>
        <Routes>
            <Route path="/" element={ <Dashboard />}/>
            <Route path="/dashboard" element={ <Dashboard />}/>
            <Route path="/statistics" element={ <Statistics />}/>
            <Route path="/about" element={ <About />}/>
        </Routes>
        </div>
        </>
    )
}

export default App;