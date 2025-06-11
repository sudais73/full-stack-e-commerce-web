import React from 'react'
import './Product.css'
import { useContext } from 'react'
import { ShopContext } from '../../Context/ShopContext'
import { useParams } from 'react-router-dom'
import Breadcrum from '../../Components/Breadcrum/Breadcrum'
import ProductDisplay from '../../Components/ProductDisplay/ProductDisplay'
import RelatedProduct from '../../Components/RelatedProduct/RelatedProduct'
const Product = () => {

const {all_product} = useContext(ShopContext);
  const {product_id} = useParams()
  const product = all_product.find((e)=> e.id === Number(product_id))

  return (
    <div>
      <Breadcrum product = {product}/>
      <ProductDisplay product = {product}/>
      <RelatedProduct/>
    </div>
  )
}

export default Product
