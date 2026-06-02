import React, { useEffect, useState } from 'react'
import {FaTachometerAlt,FaCar,FaList,FaDollarSign} from "react-icons/fa";
import logo from '../assets/logos.png'
import { Link } from 'react-router-dom';
import { NavLink } from "react-router-dom";
import { carAvailabilityAPI, getAllCarsAPI } from '../services/allAPI';
import { getCarImageUrl } from '../../constants';




function ListCar() {

  const[allCars,setAllCars] =useState([])
  const[id,setId] = useState("")

  useEffect(()=>{
     getAllCars()
  },[])

  const getAllCars = async()=>{
    const result = await  getAllCarsAPI()
    setAllCars(result.data)
    setId(result._id)
  }

  const toggleAvailability = async (id, currentStatus) => {
  try {
    const updatedStatus = !currentStatus;

    // API call
    await carAvailabilityAPI(id, {
      isAvailable: updatedStatus,
    });

    // Update UI instantly
    setAllCars((prev) =>
      prev.map((car) =>
        car._id === id
          ? { ...car, isAvailable: updatedStatus }
          : car
      )
    );
  } catch (error) {
    console.log(error);
  }
};

  console.log(allCars)
  

  return (
    <div className="flex min-h-screen bg-gray-100">
      {/* Sidebar */}
      <div className="w-64 bg-white shadow-md flex flex-col justify-between">
        <div>
          {/* Logo */}
          <div className="p-6 border-b flex items-center justify-center">
            <img width={"80px"} height={"80px"} src={logo} alt="" />
          </div>

          {/* Menu */}
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

        {/* Profile */}
        <div className="p-4 border-t flex items-center gap-3">
          <img
            src="https://i.pravatar.cc/100"
            alt="profile"
            className="w-10 h-10 rounded-full"
          />
          <h2 className="font-medium text-gray-700">John Doe</h2>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 p-8 overflow-x-auto">
        <div className="bg-white rounded-xl shadow-md overflow-hidden">
          {/* Table Header */}
          <div className="bg-cyan-500 text-white grid grid-cols-5 px-6 py-4 font-semibold text-sm">
            <p>Index</p>
            <p>Name</p>
            <p>Address</p>
            <p>Price</p>
            <p className="text-center">Available</p>
          </div>

          {/* Table Body */}
         {allCars?.map((item,index)=>(
            <div
              key={item?.id}
              className="grid grid-cols-5 items-center px-6 py-4 border-b text-sm hover:bg-gray-50 transition"
            >
              {/* Index */}
              <p className="text-gray-600">{index+1}</p>

              {/* Name */}
              <div className="flex items-center gap-3">
                <img width={'70px'} height={'70px'} src={getCarImageUrl(item?.images[0])} alt="car name" className="w-14 h-8 object-fit rounded"
                />
                <p className="font-medium text-gray-700">{item?.title}</p>
              </div>

              {/* Address */}
              <p className="text-gray-500">{item?.address}</p>

              {/* Price */}
              <p className="font-medium text-gray-700">{item?.priceRent}
                <span className='text-xs'>/day</span>
              </p>

              {/* Toggle */}
              <div className="flex justify-center">
                <button
  onClick={() => toggleAvailability(item._id, item.isAvailable)}
  className={`w-12 h-6 flex items-center rounded-full p-1 transition duration-300 ${
    item?.isAvailable ? "bg-cyan-400" : "bg-gray-300"
  }`}
>
  <div
    className={`bg-white w-4 h-4 rounded-full shadow-md transform transition duration-300 ${
      item?.isAvailable ? "translate-x-6" : "translate-x-0"
    }`}
  ></div>
</button>
              </div>
            </div>
))}
          
        </div>
      </div>
    </div>
  );
}



export default ListCar