
const TableRow = (props) => {
  
  let scoreColor;
  if(parseInt(props.data.score) < 5) scoreColor = "green"
  if(parseInt(props.data.score) >= 5 && parseInt(props.data.Score) < 8) scoreColor = "orange"
  if(parseInt(props.data.score) >= 8) scoreColor = "red"
  return (

    <tr>
      <th scope="row">{props.data.number}</th>
      <th scope="row">{props.data.comment}</th>
      <th scope="row">{props.data.type}</th>
      <th scope="row">{props.data.researchs}</th>
      <th scope="row"
        style={{color: scoreColor}}
      >{props.data.score}</th>
      <th scope="row">{props.data.source}</th>
      <th scope="row">{props.data.organization}</th>
    </tr>
  )
}

export default TableRow