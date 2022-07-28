import React from 'react'

const Comment = ({data, replies}) => {
  return (
      <div className="comment">
        <div className="comment-right-part">
          <div className='comment-content'>
            <div className='comment-author'>{data.nickname}</div> 
            <div>{data.creationDate}</div>
          </div>
          <div className='comment-text'>{data.comment}</div>
          <div className='feedbacks'> <span style={{color: 'green'}}>{data.likes}</span> <span style={{color: 'red'}}>{data.dislikes}</span>  </div>
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