import React from 'react'

const Comment = ({data}) => {



  return (
    <li>
      <b>{data.nickname}</b> 
      <br></br> 
      <p>{data.comment}</p>
    </li>
  )
}

export default Comment