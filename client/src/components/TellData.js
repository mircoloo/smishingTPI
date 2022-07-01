import {useState, useEffect } from "react";
import TableRow from "./TableRow";
import Button from "./Button";
const TellData = () => {

  const [telldata, setTelldata] = useState([])
  //const [Skip, setSkip] = useState(0)    
  const [Limit, setLimit] = useState(5) 

  const fetchData = (limit) => {
      fetch("/api/telldata/getAll", {
        method: 'POST',
        headers: {
      'Content-Type': 'application/json',
      }, 
      }) 
        .then(response => {
          return response.json()
        })
        .then(data => {
          setTelldata(data)
        })
    }

  useEffect(() => {
      fetchData()
  }, []);

  
  const onLoadMore = () => {
    /* let skip = Skip + Limit
    setSkip(skip) */
    let limit 
    if(Limit < 21){
      limit = Limit+3
    }
    
    setLimit(limit)
    let data = {
        skip: 0,
        limit: limit,
      }
    

    fetch("/api/telldata/getAll", {

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
          setTelldata(data)
        })
  }


  const onLoadLess = () => {
    /* let skip = Skip + Limit
    setSkip(skip) */
    let limit 
    if(Limit > 3){
      limit = Limit-3
    }
    
    setLimit(limit)
    let data = {
        skip: 0,
        limit: limit,
      }
    

    fetch("/api/telldata/getAll", {

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
          setTelldata(data)
        })
  }
  

return (
  <>
    
    <h2 className="mt-5">TellData</h2>
    <div className="table-responsive">
    <table className="table mt-2">
    <thead className=" thead-dark">
    <tr>
      <th scope="col">Number</th>
      <th scope="col">Comment</th>
      <th scope="col">Type</th>
      <th scope="col">Researchs</th>
      <th scope="col">Score</th>
      <th scope="col">Source</th>
      <th scope="col">Organization</th>
    </tr>
  </thead>
  <tbody>
  { telldata.map((data) => ( 
            
            <TableRow data={data} key={data._id}/>
          
          ))}
  </tbody>      
  </table>
  </div>
  <div>
    <Button text="Load More" color="black" onClick={onLoadMore}/>
    <Button text="Load Less" color="black" onClick={onLoadLess}/>
  </div>
    
    
  </>
      
)
}

export default TellData