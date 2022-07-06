import React, { useEffect, useState } from 'react'

const Links = () => {

    const [links, setLinks] = useState([])

    const fetchLinks = async () => {
        fetch('/api/twittdata/getLinks')
        .then((response) => { return response.json()})
        .then((data) => {setLinks(data)})
    }

    useEffect(() => {
        fetchLinks()
    }, []) 


    

  return (
    <div>{links.map((link) => {
        console.log(link)
    })}</div>
  )
}

export default Links