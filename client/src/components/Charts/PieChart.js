import React, { useEffect, useState } from 'react'
import { Bar, Line, Pie } from 'react-chartjs-2'
import { Chart as ChartJS } from 'chart.js/auto'
import './Charts.css'




const PieChart = ({data, pieTitle}) => {
  const colors = []
  const [pieData, setPieData] = useState()
  
  function random_rgba() {
    var o = Math.round, r = Math.random, s = 255;
    return 'rgba(' + o(r()*s) + ',' + o(r()*s) + ',' + o(r()*s) + ',' + r().toFixed(1) + ')';
}

  data.map(() => colors.push(random_rgba()))
  
  const options = { 
    legend: {
      labels: {
         fontColor: "white"
      }
   }
}
  


  const setData = () => {
    
    setPieData({
      labels: data.map( (type) => type.label),
      datasets: [{
        data: data.map( (type) => type.count),
        backgroundColor: colors
      }]
    })
  }

 

  useEffect(() => {
    setData()
  }, [])
  
  
  return (
    
    
      <>
      <h4 className='section-title'>{pieTitle}</h4>
      { pieData && <div className='pie-chart chart'><Pie data={pieData} options={options}/></div> }
      </>
    
  )
}

export default PieChart