import React from 'react'
import Home from './components/Home'
import Login from './components/Login'
import Signup from './components/Signup'
import { Navigate, Route, Routes } from 'react-router-dom'
import PageNotFound from './components/pageNotFound'
import toast, { Toaster } from 'react-hot-toast';

export default function App() {
  const token = localStorage.getItem("jwt")
  return (
    <div>
       <Routes>
        <Route path='/' element={token ? <Home/> : <Navigate to={"/login"}/>}></Route>
        <Route path='/login' element={<Login/>}></Route>
        <Route path='/signup' element={<Signup/>}></Route>
        <Route path='*' element={<PageNotFound/>}></Route>
       
       </Routes>
       <Toaster />
    </div>
  )
}
