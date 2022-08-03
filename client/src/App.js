import React from 'react'
import { Route, Routes} from 'react-router-dom'
import Dashboard from './pages/Dashboard/Dashboard'
import Header from './components/Header/Header'
import Statistics from './pages/Statistics'
import About from './pages/About'
import Login from './pages/Login/Login'
import PrivateRoutes from './utils/PrivateRoutes'
import Organization from './pages/Organization'
import Comments from './pages/Comments/Comments'
/* import Register from './pages/Register' */




const App = () => {

    return (
        <>
        <Header title={"Smishing TIP"}/>
        <div className='container'> 
        <Routes>

            <Route element={<PrivateRoutes />} >
                <Route path="/organization" element={<Organization />} />
            </Route>
            <Route path="/about" element={ <About />}/>
            <Route path="/" element={ <Dashboard />}/>
            <Route path="/login" element={ <Login /> }/>
            <Route path="/dashboard" element={ <Dashboard />}> 

                
                
            
            </Route>
            <Route path="/comments/:number" element={ <Comments />}/>
            <Route path="/statistics" element={ <Statistics />}/>
            <Route path='*' element={<h1>Error 404 page not found</h1>}/>
            
            
        </Routes>
        </div>
        </>
        
    )
}

export default App;