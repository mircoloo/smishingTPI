import React  from 'react';
import './Card.css'

const Card = ({data, isLogged, org}) => {

  const addTweetToOrg = () => {
    console.log(data)
  } 
  


  return (
    <div className="card">
              <div className='card-top'>
                <a className="card-nickname" href={"https://twitter.com/anyuser/status/" + data.id} target="_blank"  rel="noopener noreferrer">@{data.nickname}</a> 
                <div className="card-creation">{data.creation.slice(0,10)}</div>
                { org.id && <input className='add-tweet-btn btn' type="button" value="+" onClick={addTweetToOrg} /> }

                </div>
              <div className="card-body">
                
                <hr></hr> 
                {
                  data.link !== '' && <p className='card-link'>{data.link}</p>
                }

                {
                  data.organization && <h5 className='card-organization'>{data.organization}</h5>
                }
                    
                    <p className='card-comment'>{data.comment}</p>
                    
                  
              </div>
              {
              data.imageurl !== '' && 
                <div className='card-img' style={{backgroundImage: `url(${data.imageurl})`}}>
                  <a href={data.imageurl}>{/* <img src={data.imageurl}></img> */}
                    <p className='card-img-text'>{data.imagetext}</p>
                  </a>
                </div> 
              }
          </div>
  )
}

export default Card