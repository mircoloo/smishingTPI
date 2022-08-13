import React  from 'react';
import './Card.css'

const Card = ({data}) => {
  console.log(data)
  return (
    <div className="card">
              <div className='card-top'>
                <a className="card-nickname" href={"https://twitter.com/anyuser/status/" + data.id} target="_blank"  rel="noopener noreferrer">@{data.nickname}</a> 
                <div className="card-creation">{data.creation.slice(0,10)}</div>
                </div>
              <div className="card-body">
                
                <hr></hr> 
                <p className='card-link'>{data.link}</p>
                {
                  data.organization && <h5 className='card-organization'>{data.organization}</h5>
                }
                    
                    <p className='card-comment'>{data.comment}</p>
              </div>
              
              {
              data.ImageUrl !== '' && 
                <div className='card-img'>
                  <a href={data.imageurl}><img alt='' src={data.imageurl}></img></a>
                </div> 
              }
              
          </div>
  )
}

export default Card