import React, { useState } from 'react'
import './LoginRegister.css';
// import { FaUser, FaLock, FaEnvelope } from "react-icons/fa";
import axios from 'axios'
import { useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';

let LoginRegister= ()=> {
    const[state,setState]=useState("")
    let [user,setUser]=useState({userName:"",email:"",password:""})
    let [error,setError]=useState({})

let RegisterLink =()=>{
    setState('active')
} 
 
let loginLink=()=>{
    setState('')
}
function handleRegister(e){
    e.preventDefault()
    let error={}
  if(user.userName.trim()==""){
    error.userName="enter the name "
  }
  if(user.email.trim()==""){
    error.email="pls enter the email"
  }
  if(user.password.trim()==""){
    error.password="pls enter password"
  }  
   if(! /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(user.email)){
   error.email="enter the right email"
  }
  setError(error)
  if(Object.keys(error).length==0){
    axios.post('http://localhost:3000/user',{...user,cart:[],order:[]})
    setUser({userName:"",email:"",password:"",cart:[],orders:[],role:"user"})
    setState('')

  }
    return

}
let  [userName,setUserName]=useState('')
let  [password,setPassword]=useState('')
let nav=useNavigate()
async function handelLogin(e){
    e.preventDefault()
    let res= await axios.get(`http://localhost:3000/user?userName=${userName}&password=${password}`)
    console.log(userName)
    console.log(password)
    if(res.data.length>0){
        let user=res.data[0]
        localStorage.setItem("user",JSON.stringify(res.data[0]))
        localStorage.setItem("isLoggedIn","true" ) 
        console.log(user)
        let users=localStorage.getItem("user")
        let conv=JSON.parse(users)
        if(conv.role=="user"&& res.data.length>0){
             toast.success("logged in sucesssfully")
             setTimeout(()=>{ nav('/')},1000)
           
        }
        if(user.role=="admin"){
            toast.success("logged in sucesssfully")
            setTimeout(()=>{nav('/dashboard')},1000)
        }
        if(user.status=="block"){
         toast.warning("yor are blocked")
        }
       
    }else{
        alert("somthing went wrong")
    }
}

  return (
    <div className='body'>
    <div className={`wrapper ${state}`}>
        <div className=' form-box login'>
            <form id='one' onSubmit={handelLogin}>
                <h1 style={{fontSize:"30px", fontWeight:"bold",color:"white"}}>Login</h1>
                <div className='input-box'>
                    <input type='text'
                    placeholder='username' required onChange={(e)=>setUserName(e.target.value)}/>
                    {/* <FaUser className='icon' /> */}
                </div>
                <div className='input-box'>
                    <input type='password'
                    placeholder='Password' required onChange={(e)=>setPassword(e.target.value)}/>
                    {/* <FaLock  className='icon'/> */}
                </div>
                <div className='remember-forget'>
                    <label><input type='checkbox'/>Remember Me</label>
                    <a href='#'>Forgot Password</a>
                </div>
                <button type='submit' >Login</button>
                <div className='register-link'>
                    <p>Don't have an account?<a href='#' onClick={RegisterLink}>Register</a></p>
                </div>
            </form>
        </div>

        <div className=' form-box register'>
            <form className='one'>
                <h1 style={{fontSize:"30px", fontWeight:"bold",color:"white"}}>Registration</h1>
                <div className='input-box'>
                    <input type='text'
                    placeholder='username' required onChange={(e)=>{setUser({...user,userName:e.target.value})}} value={user.userName}/>
                    {/* <FaUser className='icon' />  */}
                    <p>{error && error.userName}</p>
                </div>
                <div className='input-box'>
                    <input type='email'
                    placeholder='Email' required onChange={(e)=>{setUser({...user,email:e.target.value})}} value={user.email}/>
                    {/* <FaEnvelope className='icon' />  */}
                    <p>{error && error.email}</p>
                </div>
                <div className='input-box'>
                    <input type='password'
                    placeholder='Password' required onChange={(e)=>{setUser({...user,password:e.target.value})}} value={user.password}/>
                    {/* <FaLock  className='icon'/> */}
                    <p>{error && error.password}</p>
                </div>
                <button type='submit' onClick={handleRegister}>Register</button>
                <div className='register-link'>
                    <p>Already have an Account? <a href='#one'onClick={loginLink}>Login</a></p>
                </div>
            </form>
        </div>
    </div>
    <ToastContainer autoClose={1000}/>
    </div>
  )
}
export default LoginRegister