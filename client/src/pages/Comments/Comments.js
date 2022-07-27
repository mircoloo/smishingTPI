
import React, { useState, useEffect } from 'react'
import { useParams } from "react-router-dom"
import Comment from './Comment'
import jwt from 'jwt-decode' 
const Comments = () => {

    const [comments, setComments] = useState([])
    const [Number, setNumber] = useState()
    const [user, setUser] = useState()
    let params = useParams()

    const getComments = () => {
        
      fetch("/api/telldata/comments/" + params.number, 
        {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          }
        })

        .then(data => {
          return data.json()
        })    
        .then((data) => {
          setComments(data)
        })    
    }


    const getNumberInfo = async () => {

     
   
      await fetch("/api/telldata/getOne?number=" + params.number)
      .then(data => data.json())
      .then(data => { 
        if(data[0]){setNumber([data[0]])}
      })
      
      
     }


      useEffect(() => {
        getComments() 
        getNumberInfo()
      }, [])

      

      const addComment = async () => {
        const comment = document.querySelector('#comment-text').value
        const comments = document.querySelector('.comments')
        const token = localStorage.token
      if(token){
        const u = jwt(token)

        if(!u){
            localStorage.removeItem('token')
            window.location.href('/login')
        }else{
            const response = await fetch('/api/users/' + u.id, 
            {
                method: 'GET',
                headers: {
                'Content-Type': 'application/json',
                'x-access-token': "Bearer " + token
                }
            })
        
            const data = await response.json()
            if(data[0]){
                setUser(data[0])
                console.log(data[0])
            }
        }
    }
        
      }
  
  return (
    <>
    <h1>Commenti per {params.number} </h1>
    <div className='comments'>
    { comments.map((data) => ( 
            <Comment data={data} key={data.id}/>
            
          ))}
    </div>
    

    <button onClick={addComment}>Add a comment</button>
    <input id='comment-text' type="text"></input>
    </>
  )
}


export default Comments

