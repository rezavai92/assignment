import React from 'react'
import {Link} from 'react-router-dom'
export default function Home() {
    return (
        <div style={{ height : "100vh",textAlign:"center" }} > 

              <h1>
              <Link to="/posts" >Posts</Link>
              </h1>
        </div>
    )
}
