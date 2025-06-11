import React from 'react'
import Navbar from './Components/Navbar/Navbar'
import Shop from './Pages/Shop/Shop'
     
import {BrowserRouter, Route, Routes} from 'react-router-dom'
import ShopCategory from './Pages/ShopCategory/ShopCategory'
import LoginSignup from './Pages/LoginSignup/LoginSignup'
import Cart from './Pages/Cart/Cart'
import Product from './Pages/Product/Product'
import Footer from './Components/Footer/Footer'
import men_banner from './assets/banner_mens.png'
import kid_banner from './assets/banner_kids.png'
import women_banner from './assets/banner_women.png'
const App = () => {
  return (
    <div>
      <BrowserRouter>
       <Navbar/>
      <Routes>
        <Route path='/' element= {< Shop/>}/>
        <Route path='/mens' element= {< ShopCategory banner = {men_banner} category = "men"/>}/>
        <Route path='/womens' element= {< ShopCategory banner = {women_banner} category = "women"/>}/>
        <Route path='/kids' element= {< ShopCategory  banner = {kid_banner}  category = "kid"/>}/>
        <Route path='/login' element= {< LoginSignup/>}/>
        <Route path='/cart' element= {< Cart/>}/>
        <Route path='/product/:product_id' element= {< Product/>}/>
      </Routes>
<Footer/>
      </BrowserRouter>

    </div>
  )
}

export default App
