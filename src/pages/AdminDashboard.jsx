import React, { useEffect, useState } from 'react'
import {FaTachometerAlt,FaCar,FaList,FaDollarSign} from "react-icons/fa";
import logo from '../assets/logos.png'
import { Link } from 'react-router-dom';
import { NavLink } from "react-router-dom";
import { allBookingsAPI } from '../services/allAPI';
import { getCarImageUrl } from '../../constants';
import CarDetails from './CarDetails';
import axiosInstance from '../api/axiosInstance';





function AdminDashboard() {
  const[allBookings,setAllBookings] = useState([])
  const [dp,setDp] = useState("")

  useEffect(()=>{
     getAllBookings()
    },[])
  useEffect(()=>{
if (
      sessionStorage.getItem("token") &&
      sessionStorage.getItem("user")
    ) {
      const user = JSON.parse(
        sessionStorage.getItem("user")
      );

      setDp(user.picture);
    }
  },[])
    const getAllBookings = async()=>{
      const result = await allBookingsAPI()
      setAllBookings(result.data)
    }
   


    const totalPaidAmount = allBookings.reduce((acc, item) => {
  if (item.paymentStatus !== "Paid") return acc;

  const from = new Date(item?.fromDate);
  const to = new Date(item?.toDate);

  const diffTime = to - from;
  const days = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

  const amount = days * item?.carId?.priceRent;

  return acc + (amount || 0);
}, 0);

 


  

  return (
    <div>
<div className="flex flex-col md:flex-row min-h-screen bg-gray-100">
  {/* Mobile Nav */}
  <div className="md:hidden flex overflow-x-auto bg-white shadow-md shrink-0">
    <NavLink to="/admin" className={({ isActive }) => `flex items-center gap-2 px-4 py-3 whitespace-nowrap text-sm ${isActive ? "text-cyan-600 border-b-2 border-cyan-500 font-medium" : "text-gray-600"}`}>
      <FaTachometerAlt /> Dashboard
    </NavLink>
    <NavLink to="/addcar" className={({ isActive }) => `flex items-center gap-2 px-4 py-3 whitespace-nowrap text-sm ${isActive ? "text-cyan-600 border-b-2 border-cyan-500 font-medium" : "text-gray-600"}`}>
      <FaCar /> Add Car
    </NavLink>
    <NavLink to="/listcar" className={({ isActive }) => `flex items-center gap-2 px-4 py-3 whitespace-nowrap text-sm ${isActive ? "text-cyan-600 border-b-2 border-cyan-500 font-medium" : "text-gray-600"}`}>
      <FaList /> List Car
    </NavLink>
  </div>

  <div className="hidden md:flex w-64 bg-white shadow-md flex-col justify-between shrink-0">
      {/* Sidebar */}
      <div>
                {/* Logo */}
                <div className="p-6 border-b flex items-center justify-center">
                  <img width={'80px'} height={'80px'} src={logo} alt="" />
                </div>
              <div className="mt-6">
      
        <NavLink
          to="/admin"
          className={({ isActive }) =>
            `w-full flex items-center gap-3 px-6 py-4 transition ${
              isActive
                ? "bg-cyan-50 border-r-4 border-cyan-500 text-cyan-600 font-medium"
                : "hover:bg-gray-100 text-gray-600"
            }`
          }
        >
          <FaTachometerAlt />
          Dashboard
        </NavLink>
      
        <NavLink
          to="/addcar"
          className={({ isActive }) =>
            `w-full flex items-center gap-3 px-6 py-4 transition ${
              isActive
                ? "bg-cyan-50 border-r-4 border-cyan-500 text-cyan-600 font-medium"
                : "hover:bg-gray-100 text-gray-600"
            }`
          }
        >
          <FaCar />
          Add Car
        </NavLink>
      
        <NavLink
          to="/listcar"
          className={({ isActive }) =>
            `w-full flex items-center gap-3 px-6 py-4 transition ${
              isActive
                ? "bg-cyan-50 border-r-4 border-cyan-500 text-cyan-600 font-medium"
                : "hover:bg-gray-100 text-gray-600"
            }`
          }
        >
          <FaList />
          List Car
        </NavLink>
      
      </div>
          </div>
          <div className="p-4 border-t flex items-center gap-3">
          <img
            src={`${axiosInstance.defaults.baseURL}/uploads/${dp}`}
            alt="profile"
            className="w-10 h-10 rounded-full"
          />
          <h2 className="font-medium text-gray-700">John Doe</h2>
        </div>
          </div>


      {/* Main Content */}
      <div className="flex-1 p-4 sm:p-6 min-w-0">
        {/* Top Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
          {/* Sales Card */}
          <div className="bg-blue-50 rounded-xl p-5 flex items-center gap-4 shadow-sm">
            <div className="bg-white p-4 rounded-full shadow">
              <FaCar className="text-gray-700 text-xl" />
            </div>

            <div>
              <h2 className="text-2xl font-bold text-gray-800">{allBookings.length}</h2>
              <p className="text-cyan-500 font-medium">Total Sales</p>
               </div>
          </div>

          {/* Earnings Card */}
          <div className="bg-yellow-50 rounded-xl p-5 flex items-center gap-4 shadow-sm">
            <div className="bg-white p-4 rounded-full shadow">
              <p className="text-gray-700 text-xl" >₹</p>
            </div>

            <div>
              <h2 className="text-2xl font-bold text-gray-800">{totalPaidAmount}</h2>
              <p className="text-cyan-500 font-medium">Total Earnings</p>
            </div>
          </div>
        </div>
{/* Table */}
        <div className="mt-6 sm:mt-8 bg-white rounded-xl shadow-sm overflow-x-auto">
          <table className="w-full min-w-[640px]">
            <thead className="bg-cyan-500 text-white">
              <tr>
                <th className="text-left px-6 py-4">Index</th>
                <th className="text-left px-6 py-4">Car</th>
                <th className="text-left px-6 py-4">Booking dates</th>
                <th className="text-left px-6 py-4">Amount</th>
                <th className="text-left px-6 py-4">Status</th>
              </tr>
            </thead>

            <tbody>
              {allBookings.map((item,index) => (
                <tr
                  key={item.id}
                   className="border-b hover:bg-gray-50 transition"
                >
                  <td className="px-6 py-4 text-gray-700">{index+1}</td>

                  <td className="px-6 py-4 flex items-center gap-3">
                    <img
                      src={getCarImageUrl(item?.carId?.images[0])}
                      alt="car"
                      className="w-12 h-8 object-contain"
                    />
                    <span className="text-gray-700">{item?.carId?.title}</span>
                  </td>
                  <td className="px-6 py-4 text-gray-600">
                    {item?.fromDate.split("T")[0]} to {item?.toDate.split("T")[0]}
                  </td>

                  <td className="px-6 py-4 text-gray-700">
  {(() => {
    const from = new Date(item?.fromDate);
    const to = new Date(item?.toDate);

    // Calculate difference in days
    const diffTime = to - from;
    const days = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

    // Total amount
    const totalAmount = days * item?.carId?.priceRent;

    return `₹${totalAmount}`;
  })()}
</td>

                  <td className="px-6 py-4">
  <span
    className={`px-4 py-1 rounded-full text-white text-sm ${
      item?.paymentStatus === "Paid"
        ? "bg-green-500"
        : "bg-yellow-500"
    }`}
  >
    {item?.paymentStatus === "Paid" ? "Paid" : "Not Paid"}
  </span>
</td>
                </tr>
                ))} 
            </tbody>
          </table>
        </div>
      </div>
    </div>
    </div>
  )
}

export default AdminDashboard