
import React, { useState, useEffect } from 'react'
import { useParams } from "react-router-dom"


const Comments = () => {

  const [comments, setComments] = useState()
    let params = useParams()

    const getComments = () => {
        
      fetch("/api/telldata/comments/" + params.number, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        }
      })
      .catch(err => { 
        console.log(err)
      })
      .then(data => {
        return data.json()
      })    
      .then((data) => {
        setComments(data)
      })    
    }


      useEffect(() => {
        getComments() 
      }, [])

  
  return (
    <>
    <div>Comments</div>
    {console.log(comments)}
    </>
  )
}


export default Comments

