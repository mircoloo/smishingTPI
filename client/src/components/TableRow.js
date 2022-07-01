
const TableRow = (props) => {
  
  let scoreColor;
  if(parseInt(props.data.Score) < 5) scoreColor = "green"
  if(parseInt(props.data.Score) >= 5 && parseInt(props.data.Score) < 8) scoreColor = "orange"
  if(parseInt(props.data.Score) >= 8) scoreColor = "red"
  
  return (
    <tr>
      <th scope="row">{props.data.Number}</th>
      <th scope="row">{props.data.Comment}</th>
      <th scope="row">{props.data.Type}</th>
      <th scope="row">{props.data.Researchs}</th>
      <th scope="row"
        style={{color: scoreColor}}
      >{props.data.Score}</th>
      <th scope="row">{props.data.Source}</th>
      <th scope="row">{props.data.Organization}</th>
    </tr>
  )
}

export default TableRow