/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect } from 'react'
import { Navigate, Route, Routes } from 'react-router-dom'
import HomePage from './pages/HomePage'
import About from './pages/Profile'
import SignupForm from './pages/Signup'
import LoginForm from './pages/Login'
import { useAuthStore } from './store/useAuthStore'
import {Toaster} from "react-hot-toast"
import Navbar from './components/Navbar'
import Profile from './pages/Profile'

const App = () => {
   const {authUser,checkauth}= useAuthStore()
   useEffect(()=>{
     console.log(authUser)
     checkauth()
   },[])

   console.log(authUser)

  return (

    <div className='bg-gray-800 text-white  ' >
      <Navbar/>
    <Routes>
      <Route path='/' element= { authUser? <HomePage/> : <Navigate to={'/login'} />  }  />
      <Route path='/profile' element= { authUser? <Profile/>:<Navigate to={'/login'} />}  />
      <Route path='/login' element= { !authUser? <LoginForm/>: <Navigate to={'/'} />  }  />
      <Route path='/signup' element= { !authUser? <SignupForm/> : <Navigate to={'/'} />  }  />
    </Routes>
    <Toaster  />
    </div>
  )
}

export default App