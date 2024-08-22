import React from 'react'
import { Route, Routes } from 'react-router-dom';
import Navbar from '../components/Navbar'; 
import Home from '../pages/others/Home';
import Register from '../pages/Auth/Register';
import Login from '../pages/Auth/Login';
import ForgotPassword from '../pages/Auth/ForgotPassword'; 
import SingleBlog from '../pages/Blogs/SingleBlog';
import ProfilePage from '../pages/Profile/Profile';
import ViewProfile from '../pages/Profile/ViewProfile';

const Routess = () => {
  return (
   <>
   <Navbar/>
   <Routes> 
     <Route path="/" element={<Home />} /> 
     <Route path="/register" element={<Register />} />
     <Route path="/login" element={<Login />} />
     <Route path="/forgot-password" element={<ForgotPassword />} /> 
     <Route path="/blog/:slug" element={<SingleBlog />} />
     <Route path="/profile" element={<ProfilePage />} />
     <Route path="/profile/:slug" element={<ViewProfile />} />
   </Routes>
   </>
  )
}

export default Routess