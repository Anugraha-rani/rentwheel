import {FaCog,FaGasPump, FaTachometerAlt} from "react-icons/fa";

import { GiCarSeat } from "react-icons/gi";
import { getCarImageUrl } from "../../constants";
import { useNavigate } from "react-router-dom";




 function CarCard({ car }) {
  const navigate = useNavigate()
  const currency = "₹";
  console.log(car)
  const colors = ["#EFE7DC","#f0f9fd","#fcf6ed"]
    const bgColor = colors[parseInt(car._id?.slice(-4) || "0" , 16)% colors.length]
    const id = car._id
  return (
    <div onClick={()=>navigate(`/details/${id}`)} style={{background:bgColor}} className='block rounded-lg ring-1 ring-slate-900/5 p-4 sm:p-5 cursor-pointer h-auto min-h-96'>

      <h3 className="font-bold text-base sm:text-lg line-clamp-1">
       {car.title}
      </h3>
     <div className="flex flex-col sm:flex-row sm:justify-between gap-1 mt-2">
      <div>
<p className="text-gray-500 text-sm">
      {car?.bodyType}
      
      </p>
      </div>
      <div className="text-sm">
<span className="font-bold text-blue-600">
      {currency}  {car?.priceSale}
        </span> <span className="text-bold text-blue-600">|</span>
        <span className="text-blue-600 font-bold">
      {currency}  {car?.priceRent}
        </span><span className="text-sm text-blue-600">/day</span>
      </div>

     </div>
      <img
       src={getCarImageUrl(car?.images[0])}
        alt={car.title}
        className="w-full h-40 object-contain my-4"
      />

      
      <div className='flex flex-wrap justify-evenly items-center py-2 text-gray-600 gap-2'>
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

      <p className="text-sm text-gray-500 mt-4 line-clamp-2">
       {car?.description}
      </p>
    </div>
  );
}

export default CarCard