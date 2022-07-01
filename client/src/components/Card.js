const Card = ({data}) => {
  return (
    <div className="card bg-dark " style={{width: "19rem"}}>
              {data.ImageUrl !== '' && 
              <a href={data.ImageUrl}><img className="card-img-top" src={data.ImageUrl} alt="missingImage" style={{height: "18rem"}}></img> </a>
              
            }
            {/* { data.ImageUrl === '' &&
              <img className="card-img-top" src="./missingImage.png" alt="missingImage" style={{height: "18rem"}}></img> 
            } */}
              <div className="card-body">
            <a className="card-title" href={"https://twitter.com/anyuser/status/" + data.ID} target="_blank" rel="noreferrer">{data.Nickname}<hr></hr> </a> <span>{data.Creation}</span>

            <p className="text-danger text-sm-left font-italic">{data.Link}</p>
            <h5 className="text-warning text-center">{data.Organization}</h5>
            <p className="card-text">{data.Comment}</p>
              </div>
            </div>
  )
}

export default Card