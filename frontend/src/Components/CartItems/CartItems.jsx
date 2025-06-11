import React, { useContext } from 'react'
import './CartItems.css'
import { ShopContext } from '../../Context/ShopContext'
import remove_icon from '../../assets/cart_cross_icon.png'
const CartItems = () => {
    const{all_product, cartItems,removeFromCart, getAllCartAmount} = useContext(ShopContext)
    console.log(all_product)
  return (
    <div className='cartitems'>
      <div className="cartitems-format-main">
        <p>Product</p>
        <p>Title</p>
        <p>Price</p>
        <p>Quantity</p>
        <p>Total</p>
        <p>Remove</p>
      </div>
      <hr />
     {
        all_product.map((e)=>{
            if(cartItems[e.id]>0){
              return  <div>
              <div className="cartitems-format cartitems-format-main">
                  <img className='product-icon' src={e.image} alt="" />
                  <p>{e.name}</p>
                  <p className='price'>${e.new_price}</p>
                  <button className='cartitems-quantity'>{cartItems[e.id]}</button>
                  <p className='total'>${e.new_price*cartItems[e.id]}</p>
                  <img className="remove" src={remove_icon} onClick={()=>{removeFromCart(e.id)}} alt="" />
              </div>
              <hr />
              
            </div>  
            }
            return null;
        }) }

         <div className="cartitems-down">
            <div className="cartitems-totals">
                <h1>Cart Totals</h1>
                <div>
                    <div className="cartitems-total-item">
                        <p>Subtotals</p>
                        <p>${getAllCartAmount()}</p>
                       

                    </div>
                    <hr />
                    <div className="cartitems-total-item">
                        <p>Shipping Fee</p>
                        <p>free</p>
                       
                        
                    </div>
                    <hr />
                    <div className="cartitems-total-item">
                       <h3>Total</h3>
                        <h3>${getAllCartAmount()}</h3>
                        
                        
                    </div>
                    <hr />
                </div>
                <button>PROCEED TO THE CHECKOUT</button>

            </div>

            <div className='cartitems-promo-code'>
                    <p>If You have a promo code,Enter it here.</p>
                    <div className="promobox">
                        <input type="text" placeholder='promo code'/>
                        <button>Submit</button>
                    </div>
                </div>
        </div>
    </div>
  )
}

export default CartItems
