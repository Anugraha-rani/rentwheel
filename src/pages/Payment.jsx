import React from 'react'
import {FaArrowLeft,FaLock,FaCcVisa,FaCcMastercard,FaCreditCard} from "react-icons/fa";
import { useLocation, useNavigate } from 'react-router-dom';
import { updateBookingsAPI } from '../services/allAPI';
import emailjs from "@emailjs/browser";



function Payment() {
    const location = useLocation();
  const navigate = useNavigate();
  
  const booking = location.state?.booking;
  const users = JSON.parse(sessionStorage.getItem("user"))
//   console.log(users)
  console.log(booking)
   const pickUp = new Date(booking?.fromDate);
  const dropOff = new Date(booking?.toDate);

  const totalDays = Math.ceil((dropOff - pickUp) / (1000 * 60 * 60 * 24));

  const amount = totalDays * booking?.carId?.priceRent;

  console.log(amount);

const handlePayment = async (e) => {
  e.preventDefault();

  const reqBody = {
    bookingId: booking?._id,
    paymentStatus: "Paid",
    
    paymentMethod: "Card",
    amount: amount,
  };

  try {
    const result = await updateBookingsAPI(reqBody);
    console.log(result.data);

    
    const formatDate = (date) => {
  return new Date(date).toISOString().split("T")[0];
};

const emailParams = {
  name: users?.username,
  bookingId: booking?._id,
  title: booking?.carId?.title,
  fromDate: formatDate(booking?.fromDate),
  toDate: formatDate(booking?.toDate),
  amount: amount,
  email: users?.email,
};
console.log(emailParams);
    
    await emailjs.send(
      import.meta.env.VITE_SERVICE_ID,
      import.meta.env.VITE_TEMPLATE_ID,
      emailParams,
      import.meta.env.VITE_PUBLIC_KEY
    );

    alert("Payment successful & confirmation email sent!");
    navigate("/bookings");

  } catch (error) {
    console.error("EmailJS full error:", error?.text || error);
    alert("Payment failed or email not sent");
  }
};

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-6">
      <div className="w-full max-w-6xl bg-white rounded-xl shadow-lg overflow-hidden grid grid-cols-1 md:grid-cols-2">

        {/* Left Side */}
        <div className="p-10 border-r">

          {/* Header */}
          <div className="flex items-center gap-3 text-gray-500 mb-10">
            <FaArrowLeft className="cursor-pointer" />
           
            <span className="font-medium uppercase text-sm">
           Rent Wheel
            </span>

            
          </div>

          {/* Booking Details */}
         
          <div className="mt-8">
            <h3 className="text-gray-500 text-lg">
             {booking?.carId.title}
            </h3>

            <h1 className="text-5xl font-bold mt-2">
             {amount}
            </h1>
          </div>

        </div>
          

        {/* Right Side */}
        <div className="p-10">

          {/* Link Button */}
          <button className="w-full bg-green-500 hover:bg-green-600 text-white font-semibold py-3 rounded-md">
            Pay with Link
          </button>

          {/* Divider */}
          <div className="flex items-center my-6">
            <hr className="flex-1" />
            <span className="px-3 text-gray-400 text-sm">
              Or
            </span>
            <hr className="flex-1" />
          </div>

          {/* Form */}
          <form className="space-y-5">

            {/* Email */}
            <div>
              <label className="text-sm font-medium">
              
              </label>

              <input
                type="email"
                value={users?.email || ""}
                 disabled
                className="w-full border rounded-md p-3 mt-1 outline-none focus:border-blue-500"
              />
            </div>

            {/* Card Info */}
            <div>
              <label className="text-sm font-medium">
                Payment Method
              </label>

              <div className="relative mt-1">

                <FaCreditCard
                  className="absolute left-3 top-4 text-gray-400"
                />

                <input
                  type="text"
                  placeholder="1234 1234 1234 1234"
                  className="w-full border rounded-md py-3 pl-10 pr-24 outline-none focus:border-blue-500"
                />

                <div className="absolute right-3 top-3 flex gap-2 text-2xl">
                  <FaCcVisa className="text-blue-700" />
                  <FaCcMastercard className="text-red-500" />
                </div>
              </div>

              {/* Expiry + CVC */}
              <div className="grid grid-cols-2 gap-3 mt-3">
                <input
                  type="text"
                  placeholder="MM / YY"
                  className="border rounded-md p-3 outline-none focus:border-blue-500"
                />

                <input
                  type="text"
                  placeholder="CVC"
                  className="border rounded-md p-3 outline-none focus:border-blue-500"
                />
              </div>
            </div>

            {/* Cardholder */}
            <div>
              <label className="text-sm font-medium">
                Cardholder Name
              </label>

              <input
                type="text"
                placeholder="Full name on card"
                className="w-full border rounded-md p-3 mt-1 outline-none focus:border-blue-500"
              />
            </div>

            {/* Country */}
            <div>
              <label className="text-sm font-medium">
                Country or Region
              </label>

              <select className="w-full border rounded-md p-3 mt-1 outline-none focus:border-blue-500">
                <option>China</option>
                <option>India</option>
                <option>USA</option>
              </select>
            </div>

            {/* Save Card */}
            <div className="border rounded-md p-4 flex gap-3">
              <input type="checkbox" />

              <div>
                <p className="font-medium text-sm">
                  Save my information for faster checkout
                </p>

                <p className="text-xs text-gray-500">
                  Pay securely and use saved information next time.
                </p>
              </div>
            </div>

            {/* Pay Button */}
            <button
              type="submit"
             
  onClick={handlePayment}
              className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-md font-semibold"
            >
              Pay
            </button>

          </form>
        </div>
      </div>
    </div>
  );
}

export default Payment;