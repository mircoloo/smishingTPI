import {useState, useEffect } from "react";
import Card from "./Card";
import Button from "./Button";
import Carousel from "./Carousel";
const TwittData = () => {

    const [twittdata, setTwittdata] = useState([])
    //const [Skip, setSkip] = useState(0)    
    const [Limit, setLimit] = useState(3) 


  const getTweets = () => {
          fetch("/api/twittdata/getAll", {
            method: 'POST',
            headers: {
          'Content-Type': 'application/json',
          },
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
    }, []);


    const onLoadMore = () => {
      /* let skip = Skip + Limit
      setSkip(skip) */
      let limit = 3
      
      limit = Limit+3
    
      
      setLimit(limit)
      let data = {
          skip: 0,
          limit: limit,
        }
      

      fetch("/api/twittdata/getAll", {

        method: 'POST',
        mode: 'cors',
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


    const onLoadLess = () => {
      /* let skip = Skip + Limit
      setSkip(skip) */
      let limit 
      if(Limit > 3){
        limit = Limit-3
        setLimit(limit)
      let data = {
          skip: 0,
          limit: limit,
        }
      

      fetch("/api/twittdata/getAll", {

        method: 'POST',
        mode: 'cors',
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
      
      
    }
    
    

  return (
    <div className="bg-light"> 
      <h2 className="mt-5">Twittdata</h2>
      <div className="card-columns">
       
            { twittdata.map((data) => ( 
              
              <Card data={data} key={data.ID}/>
            
            ))}
            
        
    </div>
    <Button text="Load More" color="black" onClick={onLoadMore}/>
    <Button text="Load Less" color="black" onClick={onLoadLess}/>
    </div>

   
    
        
  )
}

export default TwittData