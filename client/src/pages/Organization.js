import React, { useState, useEffect } from 'react'
//import jwt from 'jsonwebtoken'
import OrgPage from './OrgPage/OrgPage'
import UserPage from './UserPage/UserPage'


const { isAuthenticated }  = require('../utils/isAuthenticated')

const Organization = (props) => {
    const [user, setUser] = useState({})
    const token = localStorage.getItem('token')
    useEffect(() => {
        isAuthenticated(token).then((res) => {
            setUser(res);
            if( user === false){
                window.location.href = "/login"
            } 
        })
    }, [])

    return (
        
        
        <div className='page'>
            <h1 className='page-title'></h1>
        {   user.typeofuser === "Organization" ?   <OrgPage  user={user}/> : <UserPage user={user}/>    }
        
        </div>
    )
}

export default Organization