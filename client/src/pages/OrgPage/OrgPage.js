import React from 'react'

const OrgPage = (props) => {

    const { user, getUserInfo} = props;

  return (

<div>
            <h1>Welcome Organization {user.email}!</h1>
            <p>Here all the informations... <b>work in progress</b> </p>
        
        <button onClick={getUserInfo}>Refresh</button>
        <button onClick={() => {window.localStorage.clear(); window.location.href = '/login' }}>LogOut</button>

    </div>
    
  )
}

export default OrgPage