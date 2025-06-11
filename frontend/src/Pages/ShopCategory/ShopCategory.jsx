import React, { useContext } from 'react'
import './ShopCategory.css'
import { ShopContext } from './../../Context/ShopContext';
import Item from '../../Components/Item/Item';
const ShopCategory = (props) => {
  const{all_product} = useContext(ShopContext)
  return (
    <div className='shop-category'>
      <img className='banner' src={props.banner} alt="" />
      <div className="shopcategory-products">
        {all_product.map((item, i)=>{
          if(props.category===item.category){
            return <Item  key={i} image={item.image} id={item.id} name = {item.name} new_price={item.new_price} old_price={item.old_price} />
          } else return null
        })}
      </div>
       <div className="category-load-more">Explore More</div>
    </div>
  )
}

export default ShopCategory
