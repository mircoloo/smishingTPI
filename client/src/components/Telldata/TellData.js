import {useState, useEffect } from "react";
import React from 'react';
import TableRow from "../TableRow";
import Button from "../Button";
import "./TellData.css"
const TellData = () => {

  const [telldata, setTelldata] = useState([])
  //const [Skip, setSkip] = useState(0)    
  const [Limit, setLimit] = useState(5) 

  const fetchData = (limit) => {
    let data = {
      skip: 0,
      limit: limit,
    }
      fetch("/api/telldata/getAll", {
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
    fetchData(limit)
  }
  const onLoadLess = () => {
    let limit 
    if(Limit > 5){
      limit = Limit-5
      setLimit(limit)
    }
    fetchData(limit)
 }

 const searchOne = () => {

  const numberSearch = document.querySelector("#telldata-search").value
  fetch("/api/telldata/getOne?number=" + numberSearch)
  .then(data => data.json())
  .then(data => { 
    if(data[0]){setTelldata([data[0]])}
    else{ setTelldata([]);}
    setLimit(0)  
  })
  

 }
  

return (
  <>
    
    <div className="telldata-div">
    <h2 className="mt-5">TellData<i className="bi bi-search"></i></h2>

<div className="telldata-search-bar">
  <div>
  <input id="telldata-search" placeholder="Search a number"></input><button className="bg-light" onClick={searchOne}>Find</button>
  </div>
  <div>
  <input id="telldata-search" placeholder="Search a company"></input><button className="bg-light" onClick={searchOne}>Find</button>
  </div>
  
</div>


<div className="table">

<table className="table">
<thead className="telldata-thead">
<tr>
<th scope="col">Id</th>
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
        
        <TableRow data={data} key={data.number}/>
      
      ))}
</tbody>      
</table>
</div>
<div>
<Button text="Load More" color="black" onClick={onLoadMore}/>
<Button text="Load Less" color="black" onClick={onLoadLess}/>
</div>
    </div>
    
    
    
  </>
      
)
}

export default TellData