import React from 'react'
import { useNavigate } from 'react-router-dom'
import { getCarImageUrl } from '../../constants'
import { FaCog, FaGasPump } from "react-icons/fa";
import { GiCarSeat } from "react-icons/gi";
import { LuFuel } from "react-icons/lu";
import { FaTachometerAlt } from "react-icons/fa";




function Item({car}) {
    const navigate = useNavigate()
   const currency = "₹";

    const colors = ["#f5f5f5","#f0f9fd","#fcf6ed"]
    const bgColor = colors[parseInt(car._id?.slice(-4) || "0" , 16)% colors.length]
    console.log(car)
    const id = car._id
  return (
    <div onClick={()=>navigate(`/details/${id}`)} style={{background:bgColor}} className='block rounded-lg ring-1 ring-slate-900/5 p-4 sm:p-5 cursor-pointer h-auto'>
       <h4 className='line-clamp-1 font-bold text-sm sm:text-base'>{car?.title}</h4>
       <div className='flex flex-col sm:flex-row sm:justify-between sm:items-center gap-1'>
        <h5 className='my-1 text-gray-500 text-sm'>{car?.bodyType}</h5>
        <div className='text-xs sm:text-sm text-solid'>
            {currency}{car.priceSale} | {currency}{car.priceRent}.00 <span className='text-xs'>/day</span>
        </div>
       </div>
       <div className='w-full  overflow-hidden h-30  flex items-center justify-center'>
          <img className='max-w-full max-h-full object-cover' src={getCarImageUrl(car?.images[0])} alt={car?.title} />
       </div>
       <div>
        <div className='flex flex-wrap justify-evenly items-center py-2 text-gray-700 gap-2'>
            <p className='flex flex-col items-center gap-1 font-semibold text-xs sm:text-sm'>
                <FaCog size={20} />
                {car?.transmission}
            </p>
           <div className='hidden sm:block w-px h-10 bg-gray-600'></div>
            <p className='flex flex-col items-center gap-1 font-semibold text-xs sm:text-sm'>
                <GiCarSeat size={20}/>
                {car?.seats}
            </p>
           <div className='hidden sm:block w-px h-10 bg-gray-600'></div>
            <p className='flex flex-col items-center gap-1 font-semibold text-xs sm:text-sm'>
                <FaGasPump  size={20}/>
                {car?.fuelType}
            </p>
            <div className='hidden sm:block w-px h-10 bg-gray-600'></div>
            <p className='flex flex-col items-center gap-1 font-semibold text-xs sm:text-sm'>
                <FaTachometerAlt  size={20}/>
                {car?.odometer}
            </p>


        </div>
        <p className='mt-3 text-sm line-clamp-2'>{car?.description}</p>
       </div>
    </div>
  )
}

export default Item