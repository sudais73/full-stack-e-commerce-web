import React from "react";
import "./LoginSignup.css";
import { useState } from "react";
const LoginSignup = () => {
  const[state, setState] = useState("Sign Up");

  const[formData, setFormData] = useState({
     name:"",
    email:"",
    password:""
  })
  const signup =async ()=>{
// console.log("sign is working", formData);

let responseData;
await fetch("http://localhost:4600/signup", {
  method:"POST",
  headers:{
    Accept:"application/form-data",
    'content-Type':"application/json"
  },
  body:JSON.stringify(formData)
}).then((res)=>res.json()).then((data)=>responseData = data)

if(responseData.success){
  setState("Sign In")
}else{
  alert(responseData.msg)
  
}
  }

  const login =async ()=>{
    let responseData;
await fetch("http://localhost:4600/login", {
  method:"POST",
  headers:{
    Accept:"application/form-data",
    'Content-Type':"application/json"
  },
  body:JSON.stringify(formData)
}).then((res)=>res.json()).then((data)=>responseData = data)
console.log(responseData)
if(responseData.success){
  localStorage.setItem("auth-token", responseData.token)
  window.location.replace("/");
  
} else alert(responseData.msg)

  }

  const submitHandler =(e)=>{
    e.preventDefault();
    
  };
  const changeHandler = (e)=>{
    setFormData({...formData,[e.target.name]:e.target.value})

  }
  return (
    <div className="loginsignup">
      <div className="container">
        <h1>{state}</h1>
        <form onSubmit={submitHandler}>
          {
            state === "Sign Up"?<input name="name" value={formData.name} onChange={changeHandler} type="text" placeholder="Your Name" />:<></>
          }
          
          <input name="email" value={formData.email} onChange={changeHandler} type="email" placeholder="Your Email" />
          <input name="password" value={formData.password} onChange={changeHandler} type="password" placeholder="Password" />
          
           <button onClick={()=>{state === "Sign In"?login():signup()}}>Continue</button>
          
         
        </form>
        {
          state ==="Sign Up"? <p className="loginsignup-login">
          Already have account?<span onClick={()=>setState("Sign In")}>Click here</span>
        </p>: <p className="loginsignup-login">
          Create Account<span onClick={()=>setState("Sign Up")}>Click  here</span>
        </p>
        }
       
        <div className="loginsignup-agree">
          <input type="checkbox" />
          <p>by continuing, i agree to terms of use and privacy policy</p>
        </div>
      </div>
    </div>
  );
};

export default LoginSignup;