import React from 'react'
import { Link } from 'react-router-dom'
import explore from '../assets/explore.png'


function Explore() {
  return (
    <div className='px-4 sm:px-6 lg:px-10 py-5'>
    <div className='flex flex-col lg:flex-row items-center gap-6 lg:gap-0 mt-3 bg-blue-600 py-8 sm:py-12 px-4 sm:px-8 lg:px-20 rounded-xl overflow-hidden'>
       <div className='w-full lg:w-auto flex-shrink-0'>
        <img className='w-full max-w-xs sm:max-w-md mx-auto lg:mx-0 lg:-mt-16 xl:-mt-24' src={explore} alt="car" />
       </div>
       <div className='text-center lg:text-left'>
        <h5 className='text-white text-xl sm:text-2xl lg:text-3xl font-bold'>Buy With Confidence, Rent Without Worry</h5>
        <p className='mt-3 text-white text-sm sm:text-base'>Find your next ride or earn from your vehicle in minutes.We handle insurance, driver verification and secure payments.</p>
        <div className='mt-5'>
        <Link to={'/lists'} className='inline-block bg-white text-black py-3 px-4 rounded-full font-bold'>Explore cars</Link>
        </div>
       </div>
    </div>
    </div>
  )
}

export default Explore