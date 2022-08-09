import React  from 'react';
import ProtoTypes from 'prop-types'

const Button = ({text, color, onClick}) => {
   
  
    return (
    <button onClick={onClick} className="btn btn-block">{text}</button>
  )
}



Button.defaultProps = {
    color: 'black',
    
}

Button.prototype = {
    text: ProtoTypes.string,
    color: ProtoTypes.string,
    onClick: ProtoTypes.func    
}

export default Button