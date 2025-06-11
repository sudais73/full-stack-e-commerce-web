import React, { useEffect, useState } from 'react'
import './ListProduct.css'
import remove from '../../assets/cross_icon.png'
const ListProduct = () => {

    
  const[allproduct, setAllproduct] = useState([]);

  const fechInfo = async ()=>{
    fetch("http://localhost:4600/allproduct")
    .then((res)=>res.json())
    .then((data)=>{setAllproduct(data.products)})
  }

  useEffect(()=>{
    fechInfo();
  },[]);


  const removeProduct = async (id)=>{
   
    await fetch("http://localhost:4600/remove", {
      method:"DELETE",
      headers: {
        Accept: 'application/json',
        'Content-Type': "application/json",
      },
      body: JSON.stringify({id:id})
    });
    await fechInfo();
  }
  return (
    <div className='listproduct'>
      <h1>All Product List</h1>
      <div className="list-product-main">
        <p>Product</p>
        <p>Title</p>
        <p>Old Price</p>
        <p>New Price</p>
        <p>Category</p>
        <p>remove</p>
      </div>

      <div className="listproduct-allproduct">
        <hr />
        {
          allproduct.map((product,index)=>{
            return<>
             <div key={index} className="list-product-main listproduct-format">
          <img src= {product.image}  className='list-product-img' />
          <p>{product.name}</p>
          <p>{product.old_price}</p>
          <p>{product.new_price}</p>
          <p>{product.category}</p>
          <img onClick={()=>{removeProduct(product.id)}}  src={remove}className='cross-icon'/>
            </div>
            <hr /></>
          })
        }
      </div>
    </div>
  )
}

export default ListProduct
