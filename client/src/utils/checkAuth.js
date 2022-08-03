import jwt from 'jwt-decode' 

export const checkAuth = async (token) => {
            if(!token) return false;
            const u = jwt(token)
            const toRet = await fetch('/api/users/' + u.id, 
            {
                method: 'GET',
                headers: {
                'Content-Type': 'application/json',
                'x-access-token': "Bearer " + token
                }
            })
            .then((res) => {return res.json()})
            .then((data) => {if(data[0].id){return data[0]}else{return false}})
            
            return toRet
        }


    

