import React,{ useState, useEffect } from 'react'
import Card from '../../components/Card/Card';


const OrgPage = (props) => {

    const { user, getUserInfo, isLogged} = props;
    const [twittdata, setTwittdata] = useState([])
    const getTweets = (limit) => {

      let data = {
        skip: 0,
        limit: limit,
      }
    fetch("/api/twittdata/?limit=" + limit)
    .then(res => res.json() )
    .then(data => { setTwittdata(data) }) 
}

  useEffect(() => {
    getTweets(10)
  },[])

  return (

    <>
        <h1>Welcome Organization {user.email}!</h1>
        
        <button onClick={getUserInfo}>Refresh</button>
        <button onClick={() => {window.localStorage.clear(); window.location.href = '/login' }}>LogOut</button>

        {/* <div className="cards">
            { twittdata && twittdata.map( (data) => {
                return <Card data={data} key={data.id}/>
            })}
        </div> */}
    </>
    
  )
}

export default OrgPage