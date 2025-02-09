import React from 'react'
import Navbar from './Navbar'
import { Outlet } from 'react-router'
import Footer from './Footer'

const Applayout = () => {
  return (
    <div className='flex flex-col min-h-screen'>
      <Navbar/>
     <div className='flex-1'>
     <Outlet/>
     </div>
      <Footer/>
    </div>
  )
}

export default Applayout
