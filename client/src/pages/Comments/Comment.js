import React from 'react'

const Comment = ({data}) => {



  return (
    <li>{data.nickname + " " + data.comment}</li>
  )
}

export default Comment