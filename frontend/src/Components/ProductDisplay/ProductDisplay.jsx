import React, { useContext } from 'react'
import './ProductDisplay.css'
import star from '../../assets/star_icon.png'
import star_null from '../../assets/star_dull_icon.png'
import { ShopContext } from '../../Context/ShopContext'
const ProductDisplay = ({product}) => {
  const {addToCart} = useContext(ShopContext)
 return (
<div className='product-display'>
 <div className="product-display-left">
    <div className="product-display-img-list">
            <img src={product.image} alt="" />
            <img src={product.image} alt="" />
            <img src={product.image} alt="" />
            <img src={product.image} alt="" />
    </div>
     <div className="large-product-img">
            <img src={product.image} alt="" />
                
     </div>

 </div>
      <div className="product-display-right">
        <h1>{product.name}</h1>
        <div className="producr-display-right-star">
            <img src={star} alt="" />
            <img src={star} alt="" />
            <img src={star} alt="" />
            
            <img src={star_null} alt="" />
            <p>(234)</p>
            </div>
        <div className="product-right-price">

                 <div className="product-display-right-old-price">
                    ${product.old_price}
                </div>
                <div className="product-display-right-new-price">
                    ${product.new_price}
                </div>
            </div>
       
        <div className="product-display-right-discription">
        Lorem ipsum dolor sit amet, consectetur adipisicing elit. 
        culpa facere doloremque eveniet reprehenderit explicabo?
      </div>
      <div className="product-displsy-right-size">
            <h1>Sellect Size</h1>
            <div className="product-display-right-sizes">
                <p>S</p>
                <p>M</p>
                <p>L</p>
                <p>XL</p>
                <p>XXL</p>
            </div>
      </div>
      <button onClick={()=>{addToCart(product.id)}}>ADD TO CART</button>
      </div>
     

    </div>
  )
}

export default ProductDisplay
