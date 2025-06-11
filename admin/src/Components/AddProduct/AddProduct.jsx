import React, { useState } from 'react'
import './AddProduct.css'
import upload from '../../assets/upload_area.svg'
const AddProduct = () => {

    const[image, setImage] = useState(false);
    const [productDetails, setProductDetails] = useState({
        name:"",
        image:"",
        category:"women",
        new_price:"",
        old_price:""
    })

    const changeHandler = (e)=>{
        setProductDetails({...productDetails, [e.target.name]:e.target.value})
    }
    const imageHandler = (e)=>{
        setImage(e.target.files[0])
    }

    const add_product = async ()=>{
// console.log(productDetails);
let responseData;
let product = productDetails
let formData = new FormData()
formData.append("product", image);


await fetch("http://localhost:4600/upload", {
    method:"POST",
    headers:{
        Accept:"application/json"
        },
        body:formData,
}).then((res)=>res.json().then((data)=>responseData=data));


if(responseData.success){
    product.image = responseData.image_url;

    await fetch("http://localhost:4600/addproduct",{
        method:"POST",
        headers:{
            Accept:"application/json",
            "Content-Type":"application/json"
        },
        body:JSON.stringify(product)
    }).then((res)=>res.json().then((data)=>{
        if(data.success){
            alert(data.msg)
        }
    }));
}






    }
  return (
    <div className='addproduct'>
      <div className="add-product-item">
        <p>Product title</p>
        <input value={productDetails.name} onChange={changeHandler} type="text" name='name' placeholder='type here'/>
      </div>
      <div className="add-product-price">
      <div className="add-product-item">
        <p>Price</p>
        <input  value={productDetails.old_price} onChange={changeHandler}  type="text" name='old_price' placeholder='type here'/>
      </div>

      <div className="add-product-item">
        <p>Offer Price</p>
        <input  value={productDetails.new_price} onChange={changeHandler}  type="text" name='new_price' placeholder='type here'/>
      </div>
      </div>
      <div className="add-product-item">
        <p>Product Category</p>
       <select  value={productDetails.category} onChange={changeHandler}  name="category" className='add-product-selector'>
        <option value="women">Women</option>
        <option value="kid">Kid</option>
        <option value="men">Men</option>
       
       </select>
      </div>
      <div className="add-product-item">
        <label htmlFor="file-input">
        <img src={image?URL.createObjectURL(image):upload} className='upload-img'/>
        </label>
      
        <input  value={productDetails.image}  onChange={imageHandler} type="file" name='image'id='file-input' hidden/>
      </div>

      <button onClick={()=>{add_product()}} className='add-prodct-btn'>ADD</button>
    </div>
  )
}

export default AddProduct
