import React, { useState, useEffect } from 'react'
//import jwt from 'jsonwebtoken'
import OrgPage from './OrgPage/OrgPage'
import UserPage from './UserPage/UserPage'


const { checkAuth }  = require('../utils/checkAuth')

const Organization = (props) => {

    const [user, setUser] = useState({})
    

    useEffect(() => {
        checkAuth(localStorage.getItem('token')).then((res) => {setUser(res)})
    }, [])


    return (
        <>
       
        {
            user.typeofuser === "Organization" ?  <OrgPage user={user}/> : <UserPage user={user}/>    
        }
        
        </>
    )
}

export default Organization