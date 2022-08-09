import React  from 'react';
import './Card.css'

const Card = ({data}) => {
  return (
    <div className="card">
              {data.ImageUrl !== '' && 
                <div className='card-img'>
                  <a href={data.imageurl}><img src={data.imageurl}></img></a>
                </div> 
              }
              <div className="card-body">
                    <a className="card-nickname" href={"https://twitter.com/anyuser/status/" + data.id} target="_blank"  rel="noopener noreferrer">{data.nickname}<hr></hr> </a> <span>{data.creation.slice(0,10)}</span>
                    <p className='card-link'>{data.link}</p>
                    <h5 className='card-organization'>{data.organization}</h5>
                    <p className='card-comment'>{data.comment}</p>
              </div>
          </div>
  )
}

export default Card