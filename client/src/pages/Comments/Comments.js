
import React, { useState, useEffect } from 'react'
import { useParams } from "react-router-dom"
const Comments = () => {

    const [comments, setComments] = useState('')


    let params = useParams()

    const getComments = () => {
        }
      fetch("/api/telldata/comments/" + params.number, {
        method: 'GET',
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



  return (
    <div>Comments {params.number}</div>
  )
}

export default Comments