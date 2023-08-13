import { useState } from 'react'
import {Routes, Route} from 'react-router-dom'
import Navbar from "./pages/Navbar"
import Dashboard from "./pages/Dashboard"
import Login from "./pages/Login"
import Register from "./pages/Register"
import "bootstrap/dist/css/bootstrap.min.css"
import {ToastContainer} from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css';
import axios from "axios";

axios.defaults.baseURL = import.meta.env.VITE_SERVER_URL

console.log(import.meta.env.VITE_SERVER_URL);

function App() {

  return (
    <>
      <Navbar/>
      <Routes>
        <Route index element={<Dashboard/>} />
        <Route path='/login' element={<Login/>} />
        <Route path='/register' element={<Register/>} />
      </Routes>
      <ToastContainer/>
    </>
  )
}

export default App
