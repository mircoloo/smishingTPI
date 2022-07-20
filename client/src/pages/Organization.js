import React, { useState, useEffect } from 'react'
import jwt from 'jwt-decode'


const Organization = (props) => {
    const token = window.localStorage.token
    const decodedToken  = jwt(token)
    const [user, setUser] = useState({})



    async function getUserInfo(event){

        const response = await fetch('/api/users/' + decodedToken.id, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        }
        })
    
        const data = await response.json()
        if(data[0]){
            setUser(data[0])
        }
      }

    useEffect(() => {
        getUserInfo()
    }, [])


    return (
        <>
        <div>{user.typeofuser}</div>
        <div>
            <h1>Welcome {user.email}!</h1>
            <p>Here all the informations... <b>work in progress</b> </p>
        </div>
        <button onClick={getUserInfo}>Refresh</button>
        </>
    )
}

export default Organization