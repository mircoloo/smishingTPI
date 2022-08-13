import React, { useEffect, useState } from 'react'

const Comment = ({data, replies, user}) => {

  const [like, setLike] = useState(0)
  const [dislike, setDislike] = useState(0)


  const getLike = async () => {
    await fetch(`/api/telldata/comments/${data.id}/getLike`)
    .then((res) => {return res.json()})
    .then((data) => {setLike(data[0].Count)})
  } 
  const getDislike = async () => {
    await fetch(`/api/telldata/comments/${data.id}/getDislike`)
    .then((res) => {return res.json()})
    .then((data) => {setDislike(data[0].Count)})
  } 


  const addLike = async () => {

    let user_id = user.id
    let comment_id = data.id 

    const body = {
      user_id,
      comment_id
    }

    if(user){
      await fetch('/api/telldata/comments/addLike', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(body)
        })
        .then((res) => {return res.json()})
        .then((data) => {getLike()})  
    }else{
      window.location.href = '/login'
    }
    
  }

  const addDislike = async () => {

    let user_id = user.id
    let comment_id = data.id 

    const body = {
      user_id,
      comment_id
    }

    if(user){
      await fetch('/api/telldata/comments/addDislike', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(body)
        })
        .then((res) => {return res.json()})
        .then((data) => {getDislike()})  
    }else{
      window.location.href = '/login'
    }
    
  }

  useEffect(() => {
    getLike()
    getDislike()
  }, [])


  return (
      <div className="comment">
        <div className="comment-right-part">
          <div className='comment-content'>
            <div className='comment-author'>{data.nickname}</div> 
            <div>{data.creationDate.slice(0,10) }</div>
          </div>
          <div className='comment-text'>{data.comment}</div>
          <div className='feedbacks'> <span className='feedback' style={{color: 'green'}} onClick={addLike}><i className="fa fa-thumbs-up" />{like}</span> <span className='feedback' style={{color: '#e60b00'}} onClick={addDislike}><i className="fa fa-thumbs-down" />{dislike}</span>  </div>
          {replies.length > 0 && (
            <div className='replies'>
              {replies.map( (reply) => {
               return( <div className='replies'>
                  <Comment data={reply} replies={[]}/>
                </div>)
              }) }
              
            </div>
          )}
        </div>
        
       
    </div>
    
  )
}
export default Comment