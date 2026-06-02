import React from 'react'
import logos from '../assets/logos.png'
import { Link } from 'react-router-dom'
import { FiFacebook } from "react-icons/fi";
import { FaInstagram } from "react-icons/fa6";
import { SlSocialTwitter } from "react-icons/sl";
import { LuLinkedin } from "react-icons/lu";


function Footer() {
  return (
    <section className='mt-10'>

    <div className=' bg-gray-100 px-20 py-6'>
    <div className='grid grid-cols-4 gap-3 inset-x-0 '>
        <div>
          <Link><img src={logos} alt="" width={'80px'} height={'80px'} /></Link>
          <p className='text-gray-600 px-2'>Find reliable cars with transparent pricing, verified inspections, flexible pickup and delivery options and 24/7 customer support.</p>
          <div className='flex items-center gap-5 mt-4'>
            <FiFacebook className='text-xl'/>
            <FaInstagram className='text-xl'/>
            <SlSocialTwitter className='text-xl'/>
              <LuLinkedin className='text-xl'/>
          </div>
          </div>  
          <div className='mt-15 ms-20'>
            <p className='text-xl font-bold'>COMPANY</p>
            <div className='flex flex-col leading-loose mt-3 text-gray-600'>
            <Link>About</Link>
            <Link>Press</Link>
            <Link>Careers</Link>
            <Link>Blog</Link>
            <Link>Partners</Link>
            </div>
          </div>
           <div className='mt-15'>
            <p className='text-xl font-bold'>SUPPORT</p>
            <div className='flex flex-col leading-loose mt-3 text-gray-600'>
            <Link>Help Center</Link>
            <Link>Safety Information</Link>
            <Link>Cancellation Options</Link>
            <Link>Contact Us</Link>
            <Link>Accessibility</Link>
            </div>
             
          </div>
          <div className='mt-15'>
            <p className='text-xl font-bold'>STAY UPDATED</p>
            <p className='mt-5 text-gray-600'>Subscribe to our newsletter for inspiration and special offers.</p>
            <div className="mt-5">
  <div className="relative w-fit">
    <input
      type="text"
      placeholder="Your email"
      className="bg-white py-3 pl-4 pr-28 rounded-full outline-none"
    />

    <button className="absolute right-1 top-1/2 -translate-y-1/2 bg-black text-white px-4 py-2 rounded-full">
      Search
    </button>
  </div>
</div>
          </div>
    </div>
    <div className='text-gray-600 flex justify-between'>
      <div>
    <p className='mt-20'>&copy; 2026 Rentwheels. All rights reserved.</p>
    </div>
    <div className='mt-20'>
      <Link>Privacy</Link>
      <Link className='ms-5'>Terms</Link>
      <Link className='ms-5'>Sitemap</Link>
    </div>
    </div>
    </div>
    </section>
  )
}

export default Footer