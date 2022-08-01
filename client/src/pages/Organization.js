import React, { useState, useEffect } from 'react'
//import jwt from 'jsonwebtoken'
import jwt from 'jwt-decode' 
import OrgPage from './OrgPage/OrgPage'
import UserPage from './UserPage/UserPage'

const Organization = (props) => {

    const [user, setUser] = useState({})

    async function getUserInfo(event){

        const token = localStorage.token

        if(token){
            const u = jwt(token)
    
            if(!u){
                localStorage.removeItem('token')
                window.location.href('/login')
            }else{
                fetch('/api/users/' + u.id, 
                {
                    method: 'GET',
                    headers: {
                    'Content-Type': 'application/json',
                    'x-access-token': "Bearer " + token
                    }
                })
                .then((res) => {return res.json()})
                .then((data) => {data[0].id ? setUser(data[0]) : localStorage.removeItem('token')})
                
            }
        }

        
      }



    useEffect(() => {
        getUserInfo()
        
    }, [])


    return (
        <>
       
            {console.log(user)}
        {
            user.typeofuser === "Organization" ?  <OrgPage user={user} getUserInfo={getUserInfo}/> : <UserPage user={user} getUserInfo={getUserInfo}/>
           
        }
        
        </>
    )
}

export default Organization