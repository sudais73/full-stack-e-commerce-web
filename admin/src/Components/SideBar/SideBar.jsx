import React from 'react'
import './SideBar.css'
import { Link } from 'react-router-dom'
import add_icon from '../../assets/product_cart.svg'
import list_icon from '../../assets/product_list_icon.svg'

const SideBar = () => {
  return (
    <div className='sidebar'>
      <Link to={'/addproduct'} style={{textDecoration:"none"}}>
      <div className="sidebar-item">
      <img src={add_icon} alt="" />
      <p>Add product</p>
      </div>
      </Link>

      <Link to={'/listproduct'} style={{textDecoration:"none"}}>
      <div className="sidebar-item">
      <img src={list_icon } alt="" />
      <p>product List </p>
      </div>
      </Link>
    </div>
  )
}

export default SideBar
