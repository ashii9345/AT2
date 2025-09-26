import React from 'react'
import  styles from './AdNavbar.module.css'
import { useNavigate, useLocation } from 'react-router-dom'



function AdNavbar() {
const nava = useNavigate()
const loc = useLocation()

 function handleLogout(){
      nava('/login')
      localStorage.setItem("isLoggedIn","false")
      localStorage.clear()
    }
  return (
    <div className={styles.main}> 
    <h2 style={{textAlign:"center"}}>ADMIN PANEL</h2>
    <div className={styles.sub}><br/>
        <h5 className={loc.pathname === '/Dashboard'? styles.active : styles.items } onClick={()=>{nava('/Dashboard')}}>Dashboard</h5><hr/>
        <h5  className={loc.pathname === '/UserManagement'? styles.active : styles.items } onClick={()=>{nava('/UserManagement')}}>User Management</h5><hr/>
        <h5  className={loc.pathname === '/ProductManagement'? styles.active : styles.items } onClick={()=>{nava('/ProductManagement')}}>Product Management</h5><hr />
    </div> <br/>
    <button onClick={handleLogout}>LOGOUT</button>
    </div>
  )
}

export default AdNavbar