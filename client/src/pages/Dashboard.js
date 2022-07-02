import React from 'react'
import TwittData from '../components/TwittData';
import TellData from '../components/TellData';
import Carousel from '../components/Carousel';
const Dashboard =  ()  =>{

    return (
        <>
        <h1 className='text-center'>Dashboard</h1>
        <TwittData/>
        <hr style={{backgroundColor: "dark"}}></hr>
        <TellData/>
        
        </>  
        )
}


export default Dashboard