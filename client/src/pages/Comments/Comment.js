import React, { useEffect, useState } from 'react'

const Comment = ({data, replies, user}) => {

  const [like, setLike] = useState(0)


  const getLike = async () => {

    await fetch(`/api/telldata/comments/${data.id}/getLike`)
    .then((res) => {return res.json()})
    .then((data) => {console.log(data[0]); setLike(data[0].Count)})

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
        .then((data) => {console.log(data); getLike()})  
    }else{
      window.location.href = '/login'
    }
    
  }

  useEffect(() => {
    getLike()
  }, [])


  return (
      <div className="comment">
        <div className="comment-right-part">
          <div className='comment-content'>
            <div className='comment-author'>{data.nickname}</div> 
            <div>{data.creationDate}</div>
          </div>
          <div className='comment-text'>{data.comment}</div>
          <div className='feedbacks'> <span className='feedback' style={{color: 'green'}} onClick={addLike}>{like}</span> <span className='feedback' style={{color: 'red'}}>{data.dislikes}</span>  </div>
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