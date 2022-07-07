import React, { useEffect, useState } from 'react'
import './Links.css'
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
    <div>
      <table className="table mt-2">
        <thead className=" thead-dark">
          <tr>
            <th scope="col">Link</th>
            <th scope="col">Count</th>
          </tr>
        </thead>
        <tbody>
          {links.map((link) => {

            return <tr key={link.link}>
              <th scope="row">{link.link}</th>
              <th scope="row">{link.n}</th>
            </tr>

            })}
        </tbody>
      </table>

    </div>
  )
}

export default Links