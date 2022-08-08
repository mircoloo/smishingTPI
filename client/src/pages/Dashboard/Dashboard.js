import React from 'react'
import TwittData from '../../components/TwittData';
import TellData from '../../components/Telldata/TellData';
import './Dahsboard.css'
const Dashboard =  ()  =>{

    return (
        <>  
            {/* <div className='spacer layer1'></div> */}
            <h1 className='text-center'>Dashboard</h1>
            <TwittData/>
           
            {/* <div className='spacer layer1'></div> */}
            <hr style={{backgroundColor: "dark"}}></hr>
            <TellData/>
            
            
           
        </>
        )
}


export default Dashboard