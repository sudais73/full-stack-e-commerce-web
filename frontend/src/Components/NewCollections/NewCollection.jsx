import React from 'react'
import './NewCollection.css'
import Item from '../Item/Item';
import { useState } from 'react';
import { useEffect } from 'react';
const NewCollection = () => {
  const[new_collections, setNewCollections] = useState([])
  useEffect(()=>{
    fetch('http://localhost:4600/newcollections')
    .then((res)=>res.json())
    .then((data)=>{setNewCollections(data.newCollections)})
  },[])
  return (
    <div className='new-collections'>
      <h1>NEW COLLECTIONS</h1>
      <hr />
      <div className="collections">
 {new_collections.map((item,i)=>{
    return <Item key={i} image={item.image} id = {item.id} name = {item.name} new_price={item.new_price} old_price={item.old_price} />
 })}
      </div>
    </div>
  )
}

export default NewCollection
