import React  from 'react';
import { Link } from 'react-router-dom';


const TableRow = (props) => {
  
  let scoreColor;
  if(parseInt(props.data.score) < 5) scoreColor = "green"
  if(parseInt(props.data.score) >= 5 && parseInt(props.data.score) < 8) scoreColor = "orange"
  if(parseInt(props.data.score) >= 8) scoreColor = "red"
  return (
    <>
    <tr className='table-row'>
      <th className="number-row" scope="row"><Link to={`/comments/${props.data.number}`}>{props.data.number}</Link></th>
      <th className='comment-row' scope="row">{props.data.comment}</th>
      <th scope="row">{props.data.type}</th>
      <th scope="row">{props.data.researchs}</th>
      <th scope="row"
        style={{color: scoreColor}}
      >{props.data.score}</th>
      <th scope="row">{props.data.source}</th>
      { <th scope="row">{props.data.organization}</th>}
    </tr>
    </>
    
  )
}

export default TableRow