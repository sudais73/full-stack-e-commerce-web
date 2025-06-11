import React, { createContext, useState } from "react";
import { useEffect } from "react";
// eslint-disable-next-line react-refresh/only-export-components
export const ShopContext = createContext(null);

const getDefaultCart = ()=>{
        let cart = {};
        for (let index =0; index<300+1; index++){
               cart[index] =0
        }
        return cart;
}

const ShopContextprovider = (props)=>{

        const[all_product, setAll_Product] = useState([])
useEffect(()=>{
fetch("http://localhost:4600/allproduct")
    .then((res)=>res.json())
    .then((data)=>{setAll_Product(data.products)})
},[])
const[cartItems, setCartItems] = useState(getDefaultCart());
const addToCart = (itemId)=>{
       setCartItems((prev)=>({...prev,[itemId]:prev[itemId]+1})) 
}

const removeFromCart = (itemId)=>{
       setCartItems((prev)=>({...prev,[itemId]:prev[itemId]-1})) 
}

const getAllCartAmount = ()=>{
        let allAmount = 0;
        for(const item in cartItems){
                if(cartItems[item]>0){
                        let itemInfo = all_product.find((product)=>product.id===Number(item))
                        allAmount += itemInfo.new_price * cartItems[item]
                }
        } return allAmount
}

const getTotalCartItems = ()=>{
        let totalItem = 0;
        for(const item in cartItems){
                if(cartItems[item]>0){
                    totalItem+= cartItems[item]    
                }
        }return totalItem
}
    const contextValue = {all_product,cartItems,addToCart,removeFromCart, getAllCartAmount, getTotalCartItems}


    return( <ShopContext.Provider value = {contextValue}>
                {props.children}
        </ShopContext.Provider>)}

export default ShopContextprovider;