import React from 'react'
import './Popular.css'
import Item from '../Item/Item';
import { useState } from 'react';
import { useEffect } from 'react';
const Popular = () => {

  const[data_product, setDataProduct] = useState([])

  useEffect(()=>{
fetch('http://localhost:4600/popularinwomen')
.then((res)=>res.json())
.then((data)=>{setDataProduct(data.popularinwoen)})
  },[])
  return (
    <div className='popular'>
      <h1>POPULAR IN WOMEN</h1>
      <hr />
      <div className="populr-item">
        {data_product.map((item, i)=>{
            return <Item key={i} image={item.image} id={item.id} name = {item.name} new_price={item.new_price} old_price={item.old_price} />
        })}
      </div>
    </div>
  )
}

export default Popular
