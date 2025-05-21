import React from 'react'
import Sidebar from '../components/Sidebar'
import MainComponent from '../components/MainComponent'
import RightBar from '../components/RightBar'

const HomePage = () => {
  return (
    <div className='w-full h-screen flex px-[10%] py-[4%] justify-center items-center ' >
           <div className='text-white backdrop-blur-2xl mx-auto w-full h-full rounded-2xl border-3   border-white grid grid-cols-4   ' >
              <Sidebar/>
              <MainComponent />
              <RightBar/>
           </div>
    </div>
  )
}

export default HomePage