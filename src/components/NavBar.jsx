import React from 'react'
import './NavBar.css'
import { useNavigate } from 'react-router-dom'

function NavBar() {
    let nav=useNavigate()

    function handleLogin(){
      nav('/login')
    }
    function handleLogout(){
      nav('/login')
      localStorage.setItem("isLoggedIn","false")
      localStorage.clear()

    }
  return (
 <>
 <div className='con'>
  <ul className='left'>
    <li className='listItem logo' >AT2</li>
  </ul>
  <ul className='right'>
    <li className='listItem' onClick={()=>nav('/')}>Home</li>
    <li className='listItem' onClick={()=>nav('/shop')}>shop</li>
    <li className='listItem' onClick={()=>nav('/blog')}>blog</li>
    <li className='listItem' onClick={()=>nav('/cart')}>Cart</li>
    <li>{(localStorage.getItem("isLoggedIn")=== "true")?
      <div className='listItem' onClick={()=>nav('/profile')}>Profile</div>: 
      <button onClick={handleLogin}>Login</button> }</li>
  </ul>

 </div>
 </>
  )
}

export default NavBar