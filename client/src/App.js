import React, { useEffect, useState } from 'react'
import { BrowserRouter, Router, Route, Routes} from 'react-router-dom'
import Dashboard from './pages/Dashboard'
import Header from './components/Header'
import Statistics from './pages/Statistics'
import About from './pages/About'
import Login from './pages/Login/Login'
import PrivateRoutes from './utils/PrivateRoutes'
import Organization from './pages/Organization'
/* import Register from './pages/Register' */




const App = () => {

    const [authenticated, setAuthenticated] = useState(false)

    /* useEffect(() => { 
        onLoad()
    }, [])

    const onLoad = () => {

    } */


    return (
        <>
        <Header title={"Smishing TIP"}/>
        <div className='container bg-light'>
        
        <Routes>

            <Route element={<PrivateRoutes />} >
                <Route path="/organization" element={<Organization />} />
            </Route>

            <Route path="/" element={ <Dashboard />}/>
            <Route path="/login" element={ <Login /> }/>
            <Route path="/dashboard" element={ <Dashboard />}/>
            <Route path="/statistics" element={ <Statistics />}/>
            <Route path="/about" element={ <About />}/>
            
        </Routes>
        </div>
        </>
        
    )
}

export default App;