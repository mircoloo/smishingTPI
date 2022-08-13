import React, {useState, useEffect } from "react";
import Card from "../Card";
import Button from "../Button";
import './TwittData.css'
const TwittData = () => {

  const [twittdata, setTwittdata] = useState([])
    //const [Skip, setSkip] = useState(0)    
  const [Limit, setLimit] = useState(3) 


  const getTweets = (limit) => {

            let data = {
              skip: 0,
              limit: limit,
            }
          fetch("/api/twittdata/getAll", {
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
            setTwittdata(twittdata.filter((data) => {
              console.log(data)
              return data;
            }))
          }) 
          
  }

    const fetchData = () => {
        getTweets()
      }

    useEffect(() => {
        fetchData()
    }, []);

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
    
    

  return (
    <div className="twittdata-div"> 
      <h2 className="mt-5">Twittdata</h2>
      <div className="card-columns">
            { 
            twittdata.map( (data, key) => (
                <Card data={data} key={data.id}/>
            ))
            }
            
    </div>
      <Button text="Load More" color="black" onClick={onLoadMore}/>
      <Button text="Load Less" color="black" onClick={onLoadLess}/>
    </div>
    
        
  )
}

export default TwittData