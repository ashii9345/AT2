import React, { useEffect, useState } from 'react'
import "./profile.css"
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
function Profile() {
  let data=localStorage.getItem("user")
  let conv=JSON.parse(data)
  let userId=conv.id
  let [orders,setOrders]=useState(null)
  let nav=useNavigate()
  useEffect(()=>{
     axios.get(`http://localhost:3000/user/${userId}`).then((res)=>{
      setOrders(res.data.order)
     })
  },[])
  if(orders==null) return <p>no orders found</p>
  console.log(orders)

  function handleLogout(){
      nav('/login')
      localStorage.setItem("isLoggedIn","false")
      localStorage.clear()
    }
  return (
    <div>
    <div className='user'>
      <div>
      <h2>personal details</h2>
        <p>Name:{conv.userName} </p>
        <p>email:{conv.email}</p>
        <p>cartitems and quand</p> 
        <button onClick={handleLogout}>LOGOUT</button></div>  
        <img src='/src/assets/profile.jpg' className='pfp'/>     
    </div>
  
    

     <div className='previous'>
        <h1>previous orders</h1>
      <div className='orders-container'>
         {orders && orders.map((order,idx)=><><p key={idx}></p>
         <div>
          {order.items.map((p)=><div>
            <p>product Id:{p.id}</p>
            <img src={p.image} alt="" />
            <p>{p.name}</p>
            <p>{p.description}</p>
            <p>Date:{order.date}</p>
          <p>Total:{order.total}</p>
          <button onClick={()=>{
            nav(`/details/${p.id}`)
          }}>Buy Again</button>
          </div>)}
         </div>
         </>
        )
          }
      </div>
     </div>
    </div>
  )
}

export default Profile