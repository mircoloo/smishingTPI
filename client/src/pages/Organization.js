import React, { useState, useEffect } from 'react'
//import jwt from 'jsonwebtoken'
import OrgPage from './OrgPage/OrgPage'
import UserPage from './UserPage/UserPage'


const { checkAuth }  = require('../utils/checkAuth')

const Organization = (props) => {

    const [user, setUser] = useState({})
    

    useEffect(() => {
        checkAuth(localStorage.getItem('token')).then((res) => {setUser(res)})
        console.log(user)
        if(!user || Object.keys(user).length === 0){
            window.location.href = "/login"
        } 
    }, [])

    return (
        
        
        <div className='page'>
            <h1 className='page-title'></h1>
        {   user.typeofuser === "Organization" ?   <OrgPage user={user}/> : <UserPage user={user}/>    }
        
        </div>
    )
}

export default Organization