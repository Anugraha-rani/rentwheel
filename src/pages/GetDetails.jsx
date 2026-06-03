import React from 'react'
import { useNavigate } from 'react-router-dom'


function GetDetails() {
    const navigate=useNavigate()

const additionalDetails=()=>{
    navigate('/')
}
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      
      <div className="bg-gray-300 p-8 rounded-xl shadow-lg w-full max-w-md">
        <h2 className="text-2xl font-bold text-center mb-6">
          User Details
        </h2>

        <form className="space-y-4">

          {/* Address */}
          <div>
            <label className="block mb-1 font-medium">
              Address
            </label>
            <textarea
              placeholder="Enter address"
              className="w-full p-3 rounded-lg border border-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500" required
            />
          </div>

          {/* Phone */}
          <div>
            <label className="block mb-1 font-medium">
              Phone
            </label>
            <input
              type="text" required
              placeholder="Enter phone number"
              className="w-full p-3 rounded-lg border border-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* ID Type */}
          <div>
            <label className="block mb-1 font-medium">
              ID Type
            </label>
            <select
              className="w-full p-3 rounded-lg border border-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="">Select ID Type</option>
              <option>Aadhar</option>
              <option>Passport</option>
              <option>Driving License</option>
              <option>Voter ID</option>
            </select>
          </div>

          {/* ID Number */}
          <div>
            <label className="block mb-1 font-medium">
              ID Number
            </label>
            <input required
              type="text"
              placeholder="Enter ID number"
              className="w-full p-3 rounded-lg border border-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <button
            type="submit" onClick={additionalDetails}
            className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition"
          >
            Submit
          </button>

        </form>
      </div>

    </div>
  );
}



export default GetDetails