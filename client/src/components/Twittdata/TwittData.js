import React, {useState, useEffect } from "react";
import Card from "../Card/Card";
import Button from "../Button";
import './TwittData.css'
import { isAuthenticated } from "../../utils/isAuthenticated";
const TwittData = () => {

  const [twittdata, setTwittdata] = useState([])
    //const [Skip, setSkip] = useState(0)    
  const [Limit, setLimit] = useState(3) 
  const [organization, setOrganization] = useState({})

  const getOrganization = () => {
    isAuthenticated(localStorage.getItem('token'))
    .then(res => { if(res.typeofuser === 'Organization'){
      setOrganization(res)
    } })
  }

  const getTweets = (limit) => {

            let data = {
              skip: 0,
              limit: limit,
            }
          fetch("/api/twittdata/?limit=" + limit)
          .then(response => {
            return response.json()
          })
          
          .then(data => {
            /* var result = data.reduce((unique, o) => {
              if(!unique.some(obj => obj.ID === o.ID)) {
                unique.push(o);
              }
              return unique;
          },[]); */
            setTwittdata(data)
          }) 
          
  }


    const onLoadMore = () => {
      
      let limit = 3
      limit = Limit+3
  
      setLimit(limit)
      getTweets(limit)
    }


    const onLoadLess = () => {
      /* let skip = Skip + Limit
      setSkip(skip) */
      let limit 
      if(Limit > 3){
        limit = Limit-3
        setLimit(limit)
        getTweets(limit)
        
      
    }
  }

  const searchKeyWords = () => {
    const keyWords = document.querySelector("#twittdata-search-keywords").value
    const data = {
      keyWords
    }
  
    fetch("/api/twittdata/getKeyWords", {
      method: 'POST',
      headers: {
    'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
    }) 
      .then(response => {
        return response.json()
      })
      .then(data => {
        setTwittdata(data)
      })
  
    }

    const searchOrganization = () => {
      const keyWords = document.querySelector("#twittdata-search-organization").value
      const data = {
        keyWords
      }
    
      fetch("/api/twittdata/getOrganization", {
        method: 'POST',
        headers: {
      'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
      }) 
        .then(response => {
          return response.json()
        })
        .then(data => {
          setTwittdata(data)
        })
    
      }

  
  const fetchData = () => {
    getTweets()
  }

  useEffect(() => {
    fetchData()
    getOrganization()
}, []);
    
    

  return (
    <>
    <div className="twittdata-div"> 
      <h2 className="section-title">Twittdata</h2>
      <div className="telldata-search-bar">
  <div className="telldata-search">
      <input  className="input-text" id="twittdata-search-keywords" placeholder="Search keywords..." type="text"></input>
      <button onClick={searchKeyWords}>Search</button>
  </div>
  <div className="telldata-search">
      <input  className="input-text" id="twittdata-search-organization" placeholder="Search organization..." type="text"></input>
      <button onClick={searchOrganization}>Search</button>
  </div>

  
</div>
      <div className="cards">
            { twittdata.map( (data) => {
                return <Card org={organization} data={data} key={data.id}/>

})}
            
    </div>
      <div className="load-btns">
      <Button text="Load More" onClick={onLoadMore}/>
      <Button text="Load Less" onClick={onLoadLess}/>
      </div>
      
    </div>
    </>
    
        
  )
}

export default TwittData