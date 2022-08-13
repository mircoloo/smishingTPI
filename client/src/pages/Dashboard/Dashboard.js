import React from 'react'
import TellData from '../../components/Telldata/TellData';
import './Dahsboard.css'
import TwittData from '../../components/Twittdata/TwittData';
const Dashboard =  ()  =>{

    return (
        <>  
        <div className='page'>
{/*<div className='spacer layer1'></div> */}
<div>
<h1 className='page-title'>Dashboard</h1>
</div>
            
            <TwittData/>
            <TellData/>
        </div>
            
            
            
           
        </>
        )
}


export default Dashboard