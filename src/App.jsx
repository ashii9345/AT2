import React from 'react'
import LoginRegister from './Autho/LoginRegister.jsx'
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom'
import Home from './pages/Home'
import NavBar from './components/NavBar'
import Shop from './Shop/Shop'
import Cart from './pages/Cart'
import Details from './pages/Details'
import Blog from './Blog/Blog'
import Checkout from './pages/CheckOut'
import ProtectedRoute from './Autho/ProtectRoute.jsx'
import Profile from './pages/Profile.jsx'
import Dashboard from './admin/Dashboard.jsx'
import UserManagement from './admin/UserManagement.jsx'
import ProductManagement from './admin/ProductManagement.jsx'
import AdNavbar from './admin/AdNavbar.jsx'
function App() {
  let user=localStorage.getItem("user");
  let conv=JSON.parse(user)
  let role=conv?.role
  return (
    <BrowserRouter>
     {role=="admin"?"":<NavBar />}
      <Routes>
       {/* admin */}
       <Route path='/dashboard' element={<Dashboard/>} />
       <Route path='/usermanagement' element={<UserManagement/>} />
       <Route path='/productmanagement' element={<ProductManagement/>} />
       



       
        <Route path='/' element={<Home />} />
        <Route path='/login' element={<LoginRegister />} />
        <Route path='/shop' element={<Shop />} />
        <Route
          path='/cart'
          element={
            <ProtectedRoute>
              <Cart />
            </ProtectedRoute>
          }
        />
        <Route
          path='/details/:id'
          element={
            <ProtectedRoute>
              <Details />
            </ProtectedRoute>
          }
        />
        <Route
          path='/checkout'
          element={
            <ProtectedRoute>
              <Checkout />
            </ProtectedRoute>
          }
        />
        <Route
          path='/profile'
          element={
            <ProtectedRoute>
              <Profile/>
            </ProtectedRoute>
          }
        />        
        

        <Route path='/blog' element={<Blog />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
