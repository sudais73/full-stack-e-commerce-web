import React, { useContext, useState } from 'react'
import "./Navbar.css"
import logo from "../../assets/logo.png"
import cart_icon from "../../assets/cart_icon.png"
import { Link } from 'react-router-dom'
import { ShopContext } from '../../Context/ShopContext'
const Navbar = () => {

  const[menu, setMenu] = useState("shop")
  const{getTotalCartItems} = useContext(ShopContext)
  return (
    <div className='navbar'>
      <div className="nav-logo">
        <img src={logo} alt="" />
        <p>SHOPPER</p>
      </div>
      <ul className='nav-menu'>
        <Link to ="/" style={{textDecoration:"none"}}><li onClick={()=>{setMenu("shop")}} >Shop  {menu==="shop"?<hr />:<></>}</li></Link>
        
        <Link to='/mens' style={{textDecoration:"none"}}><li onClick={()=>{setMenu("mens")}} >Men {menu==="mens"?<hr />:<></>}</li> </Link>
        <Link to ="/womens" style={{textDecoration:"none"}}><li onClick={()=>{setMenu("womens")}}>Women {menu==="womens"?<hr />:<></>}</li></Link>
        <Link to ="/kids" style={{textDecoration:"none"}}><li onClick={()=>{setMenu("kids")}}>Kids {menu==="kids"?<hr />:<></>}</li> </Link>
      </ul>
      <div className="nav-login-cart">
        {localStorage.getItem("auth-token")? <button onClick={()=>{localStorage.removeItem("auth-token"); window.location.replace("/")}}>Logout</button> : <Link to = "/login"><button>Login</button></Link>}
       
        <Link to ='/cart'><img src={cart_icon} alt="" /></Link>
        <div className='count'>
        {getTotalCartItems()}
      </div>
      </div>
      
    </div>
  )
}

export default Navbar
