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
    limit = Limit+5 
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
    if(Limit > 5){
      limit = Limit-5
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
    
    
 }

 const searchOne = () => {

  const numberSearch = document.querySelector("#telldata-search").value
  fetch("/api/telldata/getOne?number=" + numberSearch)
  .then(data => data.json())
  .then(data => { 
    if(data){setTelldata([data])}
    else{ setTelldata([]);}
    setLimit(0)  
  })
  

 }
  

return (
  <>
    
    <h2 className="mt-5">TellData<i className="bi bi-search"></i></h2>
    <input id="telldata-search" placeholder="Search a number"></input><button className="bg-light" onClick={searchOne}><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-search" viewBox="0 0 16 16">
  <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001c.03.04.062.078.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1.007 1.007 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0z"/>
</svg></button>
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