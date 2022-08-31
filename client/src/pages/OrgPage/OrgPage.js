import React,{ useState, useEffect } from 'react'
import Card from '../../components/Card/Card';


const OrgPage = (props) => {

    const { user, getUserInfo, isLogged} = props;
    const [twittdata, setTwittdata] = useState([])
    const getTweets = (limit) => {

    fetch("/api/twittdata/organization/tweets/")
    .then(res => res.json() )
    .then(datas => datas.map((data) => {
      const {org_id, twittdata_id} = data;
      const body = {
        org_id,
        twittdata_id
      }
      .fetch("/api/twittdata/organization/tweets/getTweet", {
          method: 'POST',
          headers: {
        'Content-Type': 'application/json',
        },
        body: JSON.stringify(body),
      })
      .then(res => res.json())
      .then((tweets) => { 
        tweets.map((tweet) => console.log(tweet))
      })    
    }))  
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