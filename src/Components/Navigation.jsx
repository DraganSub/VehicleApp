import React from "react"
import {Link} from "react-router-dom"

import * as ROUTES from "../Common/constants/routes"

const Navigation = () => (
  <div>
    <ul className="nav nav-pills nav_ul" 
      id="nav-list"
      style={{   
        listStyle: "none",
        textDecoration: "none",
        color: "white",
        fontFamily: "cursive"
      }}>
      <li className="nav-item">
        <Link to={ROUTES.HOME} className="nav-link" style={{color:"white"}}>Home</Link>
      </li>
      <li className="nav-item">
        <Link to={ROUTES.ADD_VEHICLE} className="nav-link"  style={{color:"white"}}>Add Vehicles</Link>
      </li>
      <li className="nav-item">
        <Link to={ROUTES.LIST_VEHICLE} className="nav-link"  style={{color:"white"}}>All Vehicles</Link>
      </li>
    </ul>
  </div>
)
export default Navigation