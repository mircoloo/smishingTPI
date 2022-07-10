import  { Navigate, Outlet} from 'react-router-dom'



const useAuth = () => {
    const user = {loggedIn: true}
}


const PrivateRoutes = (props) => {




    let authToken = {'token': window.localStorage.getItem('token') }
    return(
        authToken.token ? <Outlet /> : <Navigate to='/login' />

    )
}

export default PrivateRoutes