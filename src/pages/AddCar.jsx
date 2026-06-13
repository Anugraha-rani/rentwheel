import React, { useState } from 'react'
import logo from '../assets/logos.png'
import { Link } from 'react-router-dom'
import {FaTachometerAlt,FaCar,FaList,FaDollarSign} from "react-icons/fa";
import { NavLink } from "react-router-dom";
import {FaCamera,FaUpload,FaGasPump} from "react-icons/fa";
import { addCarAPI } from '../services/allAPI';
import toast, { Toaster } from "react-hot-toast";



function AddCar() {
  const [carDetails, setCarDetails] = useState({
  agency:"",
  title:"",
  descrp:"",
  city:"",
  country:"",
  address:"",
  odometer:"",
  bodyType:"",
  priceRent:"",
  priceSale:"",
  transmission:"",
  seats:"",
  fuelType:"",
  features:[],
  isAvailable:true,
  description:""
})
const initialCarDetails = {
  agency:"",
  title:"",
  descrp:"",
  city:"",
  country:"",
  address:"",
  odometer:"",
  bodyType:"",
  priceRent:"",
  priceSale:"",
  transmission:"",
  seats:"",
  fuelType:"",
  features:[],
  isAvailable:true,
  description:""
}



const [images, setImages] = useState([null, null, null, null]);
const handleChange = (e)=>{
   const {name,value}=e.target

   setCarDetails({
      ...carDetails,
      [name]:value
   })
}

const handleFeatureChange = (feature)=>{
   setCarDetails(prev=>({
      ...prev,
      features: prev.features.includes(feature)
      ? prev.features.filter(item=>item!==feature)
      : [...prev.features,feature]
   }))
}

const handleImageChange = (e, index) => {
  const file = e.target.files[0];

  if (file) {
    const updatedImages = [...images];
    updatedImages[index] = file;

    setImages(updatedImages);
  }
};

const handleSubmit = async()=>{

   const formData = new FormData()

   Object.keys(carDetails).forEach((key)=>{
      if(key==="features"){
         formData.append(key,JSON.stringify(carDetails[key]))
      }
      else{
         formData.append(key,carDetails[key])
      }
   })

   images.forEach((image)=>{
      formData.append("images",image)
   })

   try{

      const result = await addCarAPI(formData)

      if(result.status===200){
         toast.success("Car added successfully")
         setCarDetails(initialCarDetails);
      setImages([null, null, null, null]);
      }

   }
   catch(err){
      console.log(err)
   }
}

  return (
    <div className="flex flex-col md:flex-row min-h-screen bg-[#f5f7fb]">

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
        <div>
          {/* Logo */}
          <div className="p-6 border-b flex items-center justify-center">
            <img width={"80px"} height={"80px"} src={logo} alt="logo" />
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

      {/* main part */}
      <div className="flex-1 p-4 sm:p-8 overflow-y-auto min-w-0">
        {/* Header */}
        <div className="flex items-center gap-3 mb-6 sm:mb-8">
          <FaCar className="text-2xl sm:text-3xl text-cyan-600" />
          <h1 className="text-2xl sm:text-3xl font-bold text-gray-800">
            Add New Car
          </h1>
        </div>

        {/* Form Container */}
        <div className="bg-white rounded-2xl shadow-sm p-4 sm:p-8">
          <div className="mb-5">
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Agency
            </label>

            <input
              type="text"
              name="agency"
value={carDetails.agency}
onChange={handleChange}
              placeholder="Type here..."
              className="w-full bg-gray-50 border border-gray-200 rounded-lg px-4 py-3 outline-none focus:ring-2 focus:ring-cyan-400"
            />
          </div>

          {/* Car Name */}
          <div className="mb-5">
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Car Name
            </label>

            <input
              type="text"
              name="title"
value={carDetails.title}
onChange={handleChange}
              placeholder="Type here..."
              className="w-full bg-gray-50 border border-gray-200 rounded-lg px-4 py-3 outline-none focus:ring-2 focus:ring-cyan-400"
            />
          </div>

          {/* Car Description */}
          <div className="mb-5">
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Car Description
            </label>

            <textarea
            name="descrp"
value={carDetails.descrp}
onChange={handleChange}
              rows="2"
              placeholder="Type here..."
              className="w-full bg-gray-50 border border-gray-200 rounded-lg px-4 py-3 outline-none resize-none focus:ring-2 focus:ring-cyan-400"
            ></textarea>
          </div>
          <div className="mb-5">
            <label className="block text-sm font-semibold text-gray-700 mb-2">
              Detailed Description
            </label>

            <textarea
            name="description"
value={carDetails.description}
onChange={handleChange}
              rows="4"
              placeholder="Type here..."
              className="w-full bg-gray-50 border border-gray-200 rounded-lg px-4 py-3 outline-none resize-none focus:ring-2 focus:ring-cyan-400"
            ></textarea>
          </div>

          {/* City Country Type */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5 mb-5">
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                City
              </label>

              <input
              name="city"
                type="text"
                value={carDetails.city}
onChange={handleChange}
                placeholder="Type here..."
                className="w-full bg-gray-50 border border-gray-200 rounded-lg px-4 py-3 outline-none focus:ring-2 focus:ring-cyan-400"
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Country
              </label>

              <input
                type="text"
                name="country"
value={carDetails.country}
onChange={handleChange}
                placeholder="Type here..."
                className="w-full bg-gray-50 border border-gray-200 rounded-lg px-4 py-3 outline-none focus:ring-2 focus:ring-cyan-400"
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Car Type
              </label>

              <select name="bodyType"
value={carDetails.bodyType} onChange={handleChange} className="w-full bg-gray-50 border border-gray-200 rounded-lg px-4 py-3 outline-none focus:ring-2 focus:ring-cyan-400">
                <option value="">Select Type</option>
                <option value="SUV">SUV</option>
                <option  value="Sedan">Sedan</option>
                <option value="Convertible">Convertible</option>
                <option value="Coupe">Coupe</option>
                 <option value="Hatchback">Hatchback</option>
              </select>
            </div>
          </div>

          {/* Address + Odometer */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mb-5">
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Address
              </label>

              <input
                type="text"
                name="address"
value={carDetails.address}
onChange={handleChange}
                placeholder="Type here..."
                className="w-full bg-gray-50 border border-gray-200 rounded-lg px-4 py-3 outline-none focus:ring-2 focus:ring-cyan-400"
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Odometer
              </label>

              <input
                type="text"
                name="odometer"
value={carDetails.odometer}
onChange={handleChange}
                placeholder="e.g. 12,500 km"
                className="w-full bg-gray-50 border border-gray-200 rounded-lg px-4 py-3 outline-none focus:ring-2 focus:ring-cyan-400"
              />
            </div>
          </div>

          {/* Price Section */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-4 sm:gap-5 mb-6">
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Rent Price / day
              </label>

              <input
                type="number"
                name="priceRent"
value={carDetails.priceRent}
onChange={handleChange}
                placeholder="99"
                className="w-full bg-gray-50 border border-gray-200 rounded-lg px-4 py-3 outline-none focus:ring-2 focus:ring-cyan-400"
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Sale Price
              </label>

              <input
                type="number"
                name="priceSale"
value={carDetails.priceSale}
onChange={handleChange}
                placeholder="9999"
                className="w-full bg-gray-50 border border-gray-200 rounded-lg px-4 py-3 outline-none focus:ring-2 focus:ring-cyan-400"
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Transmission
              </label>

              <select name="transmission"
value={carDetails.transmission}
onChange={handleChange} className="w-full bg-gray-50 border border-gray-200 rounded-lg px-4 py-3 outline-none focus:ring-2 focus:ring-cyan-400">
                <option value="">Select Type</option>
                <option value="Automatic">Automatic</option>
                <option value="Manual">Manual</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Seats
              </label>

              <input
                type="number"
                name="seats"
value={carDetails.seats}
onChange={handleChange}
                placeholder="4"
                className="w-full bg-gray-50 border border-gray-200 rounded-lg px-4 py-3 outline-none focus:ring-2 focus:ring-cyan-400"
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Fuel Type
              </label>

              <select name="fuelType"
value={carDetails.fuelType}
onChange={handleChange} className="w-full bg-gray-50 border border-gray-200 rounded-lg px-4 py-3 outline-none focus:ring-2 focus:ring-cyan-400">
                <option value="">Select Type</option>
                <option value="Petrol">Petrol</option>
                <option value="Diesel">Diesel</option>
                <option value="Electric">Electric</option>
                <option value="Hybrid">Hybrid</option>
              </select>
            </div>
          </div>

          {/* Features */}
          <div className="mb-6">
            <label className="block text-sm font-semibold text-gray-700 mb-3">
              Features
            </label>
<textarea
            name="features"
value={carDetails.features}
onChange={handleChange}
              rows="2"
              placeholder="Type here..."
              className="w-full bg-gray-50 border border-gray-200 rounded-lg px-4 py-3 outline-none resize-none focus:ring-2 focus:ring-cyan-400"
            ></textarea>
                  
                
              
            
          </div>

          {/* Upload Images */}
          <div className="mb-8">
  <label className="block text-sm font-semibold text-gray-700 mb-3">
    Upload Images
  </label>

  <div className="flex flex-wrap gap-4">
    {[0, 1, 2, 3].map((item) => (
      <label
        key={item}
        className="w-24 h-24 bg-gray-50 border border-dashed border-gray-300 rounded-xl flex flex-col items-center justify-center cursor-pointer hover:bg-gray-100 transition"
      >
        <FaUpload className="text-gray-400 text-xl mb-2" />

        <span className="text-xs text-gray-500">
          {images[item] ? images[item].name : "Upload"}
        </span>

        <input
          type="file"
          hidden
          onChange={(e) => handleImageChange(e, item)}
        />
      </label>
    ))}
  </div>
</div>

          {/* Button */}
          <button onClick={handleSubmit} className="bg-cyan-500 hover:bg-cyan-600 text-white px-8 py-3 rounded-xl font-semibold transition">
            Add Car
          </button>
        </div>
      </div>
      {/* toast */}
              <Toaster position="top-center" />
    </div>
  );
}

export default AddCar;
   


  