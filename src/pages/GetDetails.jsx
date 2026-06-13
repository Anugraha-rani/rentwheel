import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { userDetailsUpdateAPI } from "../services/allAPI";



function GetDetails() {
  const navigate = useNavigate();
  
  
  
const user = JSON.parse(sessionStorage.getItem("user"));

 

  const [details, setDetails] = useState({
    address: "",
    phone: "",
    idType: "",
    idNumber: ""
  });

  const handleChange = (e) => {
    const { name, value } = e.target;

    setDetails({
      ...details,
      [name]: value
    });
  };

  const additionalDetails = async (e) => {
    e.preventDefault();

   

    const reqBody = new FormData();

    reqBody.append("address", details.address);
    reqBody.append("phone", details.phone);
    reqBody.append("idType", details.idType);
    reqBody.append("idNumber", details.idNumber);

    // Existing values to avoid overwriting
    reqBody.append("username", user.username);
    reqBody.append("email", user.email);
    
    reqBody.append("picture", user.picture);
    reqBody.append("role", user.role);

    try {
      const userId = user?._id
      const result = await userDetailsUpdateAPI(userId, reqBody);

      if (result.status === 200) {
        alert("Profile updated successfully");
        navigate("/");
      }
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4 py-8">
      <div className="bg-gray-300 p-6 sm:p-8 rounded-xl shadow-lg w-full max-w-md">

        <h2 className="text-2xl font-bold text-center mb-6">
          User Details
        </h2>

        <form className="space-y-4" onSubmit={additionalDetails}>

          <div>
            <label className="block mb-1 font-medium">
              Address
            </label>

            <textarea
              name="address"
              value={details.address}
              onChange={handleChange}
              placeholder="Enter address"
              className="w-full p-3 rounded-lg border"
              required
            />
          </div>

          <div>
            <label className="block mb-1 font-medium">
              Phone
            </label>

            <input
              type="text"
              name="phone"
              value={details.phone}
              onChange={handleChange}
              placeholder="Enter phone number"
              className="w-full p-3 rounded-lg border"
              required
            />
          </div>

          <div>
            <label className="block mb-1 font-medium">
              ID Type
            </label>

            <select
              name="idType"
              value={details.idType}
              onChange={handleChange}
              className="w-full p-3 rounded-lg border"
              required
            >
              <option value="">Select ID Type</option>
              <option value="Aadhar">Aadhar</option>
              <option value="Passport">Passport</option>
              <option value="Driving License">Driving License</option>
              <option value="Voter ID">Voter ID</option>
            </select>
          </div>

          <div>
            <label className="block mb-1 font-medium">
              ID Number
            </label>

            <input
              type="text"
              name="idNumber"
              value={details.idNumber}
              onChange={handleChange}
              placeholder="Enter ID number"
              className="w-full p-3 rounded-lg border"
              required
            />
          </div>

          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700"
          >
            Submit
          </button>

        </form>
      </div>
    </div>
  );
}

export default GetDetails;