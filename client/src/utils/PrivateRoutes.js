import  { Navigate, Outlet} from 'react-router-dom'
import React from 'react';



const PrivateRoutes = (props) => {

    let authToken = {'token': localStorage.getItem('token') }
    return(
        authToken.token ? <Outlet /> : <Navigate to='/login' />
    )
}

export default PrivateRoutes