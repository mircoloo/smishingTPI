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

  const numberSearch = document.querySelector("#telldata-search-number").value
  fetch("/api/telldata/getOne?number=" + numberSearch)
  .then(data => data.json())
  .then(data => { 
    if(data[0]){setTelldata([data[0]])}
    else{ setTelldata([]);}
    setLimit(0)  
  })
 }

 const searchKeyWords = () => {
  const keyWords = document.querySelector("#telldata-search-keywords").value
  const data = {
    keyWords
  }

  fetch("/api/telldata/getKeyWords", {
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
  

return (
  <>
    
    <div className="telldata-div">
    <h2 className="section-title">TellData<i className="bi bi-search"></i></h2>

<div className="telldata-search-bar">
  <div className="telldata-search">
      <input  className="input-text" id="telldata-search-number" placeholder="Search number informations..." type="text"></input>
      <button onClick={searchOne}>Search</button>
  </div>
  <div className="telldata-search">
      <input  className="input-text" id="telldata-search-keywords" placeholder="Search keywords..." type="text"></input>
      <button onClick={searchKeyWords}>Search</button>
  </div>

  
</div>



<table className="table">
<thead className="table-thead">
<tr className="table-header">
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
<div className="load-btns">
<Button text="Load More" color="black" onClick={onLoadMore}/>
<Button text="Load Less" color="black" onClick={onLoadLess}/>
</div>
    </div>
    
    
    
  </>
      
)
}

export default TellData