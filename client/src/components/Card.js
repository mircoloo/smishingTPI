const Card = ({data}) => {
  return (
    <div className="card bg-dark " style={{width: "19rem"}}>
              {data.ImageUrl !== '' && 
              <a href={data.imageurl}><img className="card-img-top" src={data.imageurl} style={{height: "18rem"}}></img> </a>
              
            }
              <div className="card-body">
            <a className="card-title" href={"https://twitter.com/anyuser/status/" + data.id} target="_blank" rel="noreferrer">{data.nickname}<hr></hr> </a> <span>{data.creation.slice(0,10)}</span>

            <p className="text-danger text-sm-left font-italic">{data.link}</p>
            <h5 className="text-warning text-center">{data.organization}</h5>
            <p className="card-text">{data.comment}</p>
              </div>
            </div>
  )
}

export default Card