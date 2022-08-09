import React from 'react'
import TellData from '../../components/Telldata/TellData';
import './Dahsboard.css'
import TwittData from '../../components/Twittdata/TwittData';
const Dashboard =  ()  =>{

    return (
        <>  
        <div className='page'>
{/*<div className='spacer layer1'></div> */}
            <h1 className='page-title'>Dashboard</h1>
            <TwittData/>
           
            {/* <div className='spacer layer1'></div> */}
            <hr style={{backgroundColor: "dark"}}></hr>
            <TellData/>
        </div>
            
            
            
           
        </>
        )
}


export default Dashboard