import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { availabilityCheckAPI, bookCarAPI, getACarAPI } from '../services/allAPI'
import {FaGasPump,FaUserFriends,FaCog,FaStar} from "react-icons/fa";
import { getCarImageUrls } from '../../constants';
import { CiLocationOn } from "react-icons/ci";
import { CiPhone } from "react-icons/ci";
import { MdOutlineMail } from "react-icons/md";
import { IoCallOutline } from "react-icons/io5";
import toast, { Toaster } from "react-hot-toast";



function CarDetails() {
  const {id} = useParams()
  const navigate = useNavigate()
  const[carDetails,setCarDetails]=useState()
  const[pickUpDate,setPickUpDate]=useState(null)
  const[dropOffDate,setDropOffDate]= useState(null)
  const [available,setAvailable] = useState(false)
  const [selectedImage, setSelectedImage] = useState("");
  const [userId,setUserId] = useState("")
  const [token,setToken] = useState("")
  // console.log(userId)
  
  const currency = "₹";
 
  
  
  
  console.log(carDetails)
  

  useEffect(()=>{
    singleCarDetails()
  },[])

  useEffect(()=>{
    if(sessionStorage.getItem("user")){
    const user = JSON.parse(sessionStorage.getItem("user"))
    const token = sessionStorage.getItem("token")
    setUserId(user._id)
    setToken(token)
    }
  },[])
  //  console.log(token)

  const singleCarDetails=async()=>{
    const result=await getACarAPI(id)
    setCarDetails(result.data)
    const urls = getCarImageUrls(result.data.images);
  if (urls.length > 0) {
    setSelectedImage(urls[0]);
  }
  }

   const availabilityCheck = async () => {

  
  if (!pickUpDate || !dropOffDate) {
    toast.error("Please select pickup and drop-off dates");
    return;
  }
  
    if (!carDetails?.isAvailable) {
    toast.error("Car is currently unavailable");
    setIsAvailable(false);
    return;
  }

  
  const carData = {
    carId: id,
    fromDate: pickUpDate,
    toDate: dropOffDate,
  };

  const result = await availabilityCheckAPI(carData);
  console.log(result)

  if (result.data.available) {
    toast.success("Car is available");
    setAvailable(true);
  } else {
    toast.error("Car is not available for selected dates");
    setAvailable(false);
  }
};

console.log(carDetails?.isAvailable)
console.log(typeof carDetails?.isAvailable)

 



  const handleBooking = async () => {

  // calculate days
  const startDate = new Date(pickUpDate);
  const endDate = new Date(dropOffDate);

  const diffTime = endDate - startDate;
  const totalDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

  // calculate amount
  const amount = totalDays * carDetails?.priceRent;

  const bookingData = {
    userId,
    carId: id,
    fromDate: pickUpDate,
    toDate: dropOffDate,
    amount, 
    paymentMethod: "Stripe" 
  };

  const result = await bookCarAPI(bookingData);
  console.log(result)

  if (result.status == 200 || result.status == 201) {
    toast.success("Booking successful");
    navigate('/bookings')
  } else {
    toast.error("Booking failed");
  }
};
  

  return (
    
     <div className="max-w-7xl mx-auto p-6">
      <div className="grid lg:grid-cols-2 gap-6">

        {/* LEFT SIDE */}
        <div className="bg-white rounded-xl p-6 shadow-sm">
          <div className='flex items-center'>
            <CiLocationOn className='me-2'/>
          <p className="text-gray-500 text-sm">
          {carDetails?.address}
          </p>
          </div>

          <div className="flex justify-between items-start mt-2">
            <div>
              <h1 className="text-3xl font-bold">{carDetails?.title}</h1>
              <p className="text-sky-500 font-medium">
                {carDetails?.bodyType}
              </p>
            </div>
            <div className="text-right">
              <h2 className="font-bold text-xl">
                ₹{carDetails?.priceRent}/day
              </h2>

              <div className="flex items-center gap-1 justify-end mt-1">
                <span>5.0</span>
                {[...Array(5)].map((_, i) => (
                  <FaStar key={i} className="text-yellow-400" />
                ))}
              </div>
            </div>
          </div>
           <div className="flex flex-wrap gap-5 text-gray-600 mt-5">
            <div className="flex items-center gap-2">
              <FaCog />
              <span>{carDetails?.transmission}</span>
            </div>

            <div className="flex items-center gap-2">
              <FaUserFriends />
              <span>{carDetails?.seats} Seats</span>
            </div>

            <div className="flex items-center gap-2">
              <FaGasPump />
              <span>{carDetails?.fuelType}</span>
              </div>
          </div>

          {/* Description */}
          <div className="mt-6">
            <h3 className="font-semibold text-lg">Car Details</h3>
            <p className="text-gray-500 mt-2">
              {carDetails?.descrp}
            </p>
          </div>
          <div className="mt-6">
            <h3 className="font-semibold text-lg mb-3">Features</h3>

            <div className="flex flex-wrap gap-2">
              
                <span
                 
                  className="px-3 py-2 bg-gray-100 rounded-lg text-sm"
                >
                  {carDetails?.features}
                </span>
              
              </div>
          </div>

          {/* Booking */}
          <div className="grid md:grid-cols-3 gap-3 mt-8">
            <input
              type="date"
              className="border rounded-lg p-3"
              
          value={pickUpDate} required
          onChange={(e) => setPickUpDate(e.target.value)}
            />

            <input
              type="date" required
              className="border rounded-lg p-3"
              value={dropOffDate}
          onChange={(e) => setDropOffDate(e.target.value)}
            />
            {
  !carDetails?.isAvailable ? (

    <button
      disabled
      className="bg-gray-400 text-white rounded-lg p-3 cursor-not-allowed"
    >
      Currently Unavailable
    </button>

  ) : !available ? (

    <button
      className="bg-sky-500 text-white rounded-lg p-3"
      onClick={() => {
        if (!token) {
          toast.error("Please login");
          navigate("/login");
          return;
        }

        availabilityCheck();
      }}
    >
      Check Dates
    </button>

  ) : (

    <button
      onClick={() => {
        if (!token) {
          toast.error("Please login");
          navigate("/login");
          return;
        }

        handleBooking();
      }}
      className="bg-green-500 text-white rounded-lg p-3"
    >
      Book Now
    </button>

  )
}

          </div>
          <div className="w-[320px] rounded-lg border mt-10 border-gray-200 bg-gray-100 p-4 shadow-sm">
      <h2 className="font-semibold text-gray-800 mb-3">
        For Buying Contact
      </h2>

      <div className="border border-gray-200 rounded-md overflow-hidden">
        {/* Top Section */}
        <div className="flex items-center justify-between p-3">
          <div>
            <div className="flex items-center gap-2">
              <h3 className="font-semibold text-gray-800">
               {carDetails?.agency}
              </h3>

              <span className="bg-green-100 text-green-600 text-xs px-2 py-0.5 rounded-full">
                Agency
              </span>
            </div>

            <p className="text-sm text-gray-500">Agency Office</p>
          </div>

          <img
            src="https://randomuser.me/api/portraits/men/32.jpg"
            alt="profile"
            className="w-10 h-10 rounded-full object-cover"
          />
        </div>

        {/* Contact Details */}
        <div className="border-t border-gray-200">
          <div className="flex items-center gap-2 px-3 py-2 text-sm text-gray-600">
            <IoCallOutline className="text-green-500" />
            <span>0123456789</span>
          </div>

          <div className="border-t border-gray-200 flex items-center gap-2 px-3 py-2 text-sm text-gray-600">
            <MdOutlineMail className="text-green-500" />
            <span>{`contact@${carDetails?.agency}.com`}</span>
          </div>
        </div>

        {/* Actions */}
        <div className="border-t border-gray-200 flex">
          <button className="flex-1 flex items-center justify-center gap-2 py-3 text-gray-600 hover:bg-gray-50">
            <MdOutlineMail />
            <span>Send Email</span>
          </button>

          <div className="w-px bg-gray-200"></div>

          <button className="flex-1 flex items-center justify-center gap-2 py-3 text-gray-600 hover:bg-gray-50">
            <CiPhone />
            <span>Call Now</span>
          </button>
        </div>
      </div>
    </div>
  





</div>

          

        {/* RIGHT SIDE */}
        <div>
         
           <div className="bg-gray-100 rounded-xl h-[350px] flex items-center justify-center">
            <img
              src={selectedImage}
              alt="car"
              className="w-full h-full object-contain"
              />
          </div> 
         

         
        <div className="grid grid-cols-2 gap-3 mt-5">
  {getCarImageUrls(carDetails?.images || []).map((img, index) => (
    <div
      key={index}
      onClick={() => setSelectedImage(img)}
      className={`cursor-pointer rounded-xl overflow-hidden border-2 ${selectedImage === img? "border-sky-500": "border-transparent"}`}>
      <div className='flex justify-center items-center'>
      <img width={'200px'} height={'200px'}
        src={img}
        alt=""
        className=" object-cover"
      />
      </div>
    </div>
  ))}
</div>
           
       
</div>
</div>
 {/* toast */}
        <Toaster position="bottom-right" />
</div>


        
      
    
    
  )
  }
  


export default CarDetails