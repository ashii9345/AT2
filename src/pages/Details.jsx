import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import axios from 'axios'
import './Details.css'
import { ToastContainer, toast } from 'react-toastify';
function Details() {
    let {id}=useParams()
    let [ids,setids]=useState(id)
    let [products,setProducts]=useState(null)
    let [allProducts,setAllProduct]=useState([])
    useEffect(()=>{
        axios.get(`http://localhost:3000/AllProducts/${ids}`)
        .then((res)=>setProducts(res.data))
        .catch((error)=>{alert("something went wrong")})
        axios.get('http://localhost:3000/AllProducts').then((res)=>setAllProduct(res.data))
    },[ids])
    let user=localStorage.getItem("user")
    let conv=JSON.parse(user)
    let userId=conv.id
    function handleCart(id){
      let updatedCart=[...conv.cart,id];
      axios.patch(`http://localhost:3000/user/${userId}`,{cart:updatedCart}).then(()=>{
        toast.success("added to cart")
      }).catch(()=>{
        alert("something")
      })
      conv.cart=updatedCart;
      localStorage.setItem("user",JSON.stringify(conv))
    }
    if(products==null){
        return (<>Loading...</>)
    }
    let related=allProducts.filter((p)=>p.category==products.category && p.id!=products.id)
    
    let val=Math.round(Math.random()*5)
  return (
    <>
    <div className='contain d-flex'>
        <div className='image-container'style={{width:"50%"}}>
            <img src={products?.image} alt="" />
        </div>
        <div className='details' style={{width:"50%"}}>
            <h3 className='product-name'>{products.name}</h3>
            <p className='product-category'>{products.category}</p>
            <p className='product-description'>{products.description}</p>
            
            <p>rating : {val==0?"★":"★".repeat(val)} ({val})</p>
            <p className='price'>₹{products.price}</p>
            <div>
                <button className='carts-rel' style={{padding:"20px 50px"}} onClick={()=>{handleCart(products.id)}}>Cart</button>
            </div>
        </div>
        </div>
        <div className='related-product'>
            {related && related.map((p)=><div className='card-rel' key={p.id} onClick={()=>setids(p.id)}>
                <img className='images-rel' src={p.image} alt="" />
                <h2 className='names-rel'>{p.name}</h2>
                <p className='categorys-rel'>{p.category}</p>
                <p className='prize-rel'>{p.prize}</p>
                <button className='carts-rel' onClick={()=>{handleCart(p.id)}}>Cart</button>
            </div>)}
            <ToastContainer autoClose={1000}/>
        </div>
    </>
  )
}

export default Details