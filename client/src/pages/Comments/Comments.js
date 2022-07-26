
import React, { useState, useEffect } from 'react'
import { useParams } from "react-router-dom"
import Comment from './Comment'
import jwt from 'jwt-decode' 
const Comments = () => {

    const [comments, setComments] = useState([])
    const [Number, setNumber] = useState()
    const [user, setUser] = useState()
    let params = useParams()
    let nickname;
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
        if(data[0]){setNumber(data[0])}
       
      })
      
      
     }


      useEffect(() => {
        getComments() 
        getNumberInfo()
      }, [])

      

      const addComment = async () => {
        const comment = document.querySelector('#comment-text')
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
            .then((res) => {return res.json()})
            .then( (res) => {
                setUser(res[0])
                nickname = res[0].email
             
            })
          }
        }
        
        await fetch('/api/telldata/comments', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            "nickname": nickname, 
            "telldata_id": Number.id,
            "comment": comment.value
          })
          })
          .then((res) => {return res.json()})
          .then( (res) => {if(res.inserted){ /* alert("Commento inserito correttamente"); */ window.location.reload()  }
                          else{ comment.style.backgroundColor = "red";}} )
      
          
          
    }
 
      
  
  return (
    <>
    <h1>Commenti per {params.number}</h1>
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

