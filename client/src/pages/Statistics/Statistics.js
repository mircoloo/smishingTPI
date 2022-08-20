import React, { useEffect, useState } from 'react'
import PieChart from '../../components/Charts/PieChart'
import Links from '../../components/Links/Links'
import "./Statistics.css"




const Statistics = () => {

  const [typesOfSms, setTypeOfSms] = useState()

  const getTypeOfSms = async () => {
    fetch("/api/telldata/comments/typeOfSms")
    .then((res) => {return res.json()})
    .then((data) => {setTypeOfSms(data)})
  }

  useEffect(() =>{
    getTypeOfSms()
  }
  ,[])

  return (
    <div className='statistics-page page'>
      <h1 className='page-title'>Statistics</h1>
      <Links/>
      {typesOfSms  && <PieChart data={typesOfSms} />}
      
    </div>
  )
}

export default Statistics