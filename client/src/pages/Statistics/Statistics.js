import React, { useEffect, useState } from 'react'
import PieChart from '../../components/Charts/PieChart'
import Links from '../../components/Links/Links'
import "./Statistics.css"




const Statistics = () => {

  const [typesOfSms, setTypeOfSms] = useState()
  const [organizations, setOrganizations] = useState()

  const getTypeOfSms = async () => {
    fetch("/api/telldata/comments/typeOfSms")
    .then((res) => {return res.json()})
    .then((data) => {setTypeOfSms(data)})
  }

  const getOrganizations = async () => {
    fetch("/api/twittdata/typeOfOrganizations")
    .then((res) => {return res.json()})
    .then((data) => {setOrganizations(data)})
  }

  useEffect(() =>{
    getTypeOfSms()
    getOrganizations()
  }
  ,[])

  return (
    <div className='statistics-page page'>
      <h1 className='page-title'>Statistics</h1>
      <Links/>
      
      <div className='pie-charts-section'>
        <h2 className='section-title'></h2>
        <div className='charts'>
          {typesOfSms  && <PieChart data={typesOfSms} pieTitle="Types of SMS"/>}
          {organizations && <PieChart data={organizations} pieTitle="Organizations"/>}
        </div>
      </div>  
    </div>
  )
}

export default Statistics