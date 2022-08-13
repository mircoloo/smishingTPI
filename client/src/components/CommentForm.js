import React, { useState } from 'react'


const CommentForm = ({handleSubmit, userId}) => {
    const [text, setText] = useState('')
    const isTextAreaDisabled = text.length === 0;

    const onSubmit = event => {
        event.preventDefault();
        handleSubmit(text);
        setText("")
    }

  return (
        <form className='comment-form' onSubmit={onSubmit}>
            <textarea placeholder='Write a comment...' className='comment-form-textarea' value={text} onChange={(e) => setText(e.target.value)} />
            <button className='comment-form-button btn' disabled={isTextAreaDisabled}>Write</button> 
        </form>
  )
}

export default CommentForm