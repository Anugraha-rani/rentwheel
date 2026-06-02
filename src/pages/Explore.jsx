import React from 'react'
import { Link } from 'react-router-dom'
import explore from '../assets/explore.png'


function Explore() {
  return (
    <div className=' px-10 py-5'>
    <div className='flex  mt-3 bg-blue-600 py-12 rounded-xl'>
       <div className='px-20'>
        <img width={'600px'} height={'600px'}  className='' style={{marginTop:"-100px"}} src={explore} alt="car" />
       </div>
       <div className=''>
        <h5 className='text-white text-3xl font-bold'>Buy With Confidence, Rent Without <br /> Worry</h5>
        <p className='mt-3 text-white'>Find your next ride or earn from your vehicle in minutes.We handle insurance, driver verification and secure payments.</p>
        <div className='mt-5'>
        <Link to={'/lists'} className='bg-white text-black py-3 px-4 rounded-full font-bold '>Explore cars</Link>
        </div>
       </div>
    </div>
    </div>
  )
}

export default Explore