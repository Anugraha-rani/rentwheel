import apiService from "../api/apiService";

export const addCarAPI = async(formData)=>{
         return await apiService("POST",'/add',formData)
}

export const getFeaturedCarAPI = async()=>{
    return await apiService("GET",'/featured',{})
}

// all cars
export const getAllCarsAPI=async()=>{
    return await apiService("GET",'/cars',{})
}

// single car for details

export const getACarAPI=async(id)=>{
    return await apiService("GET",`/cars/${id}`,{})
}

export const availabilityCheckAPI = async(carData)=>{
return await apiService("POST",'/availability',carData)
}

export const bookCarAPI = async(bookingData)=>{
    return await apiService("POST",'/book',bookingData)
}

export const allBookingsAPI = async()=>{
    return await apiService("GET",'/allbookings',{})
}

export const carAvailabilityAPI = async(id, reqBody) => {
  return await apiService("PUT",`/caravailability/${id}`,reqBody)
}



// user api

export const registerUserAPI = async(userData)=>{
    return await apiService("POST",'/adduser',userData)
}

export const loginUserAPI = async(userData)=>{
    return await apiService("POST",'/loginuser',userData)
}

export const googleLoginAPI = async(userData)=>{
    return await apiService("POST",'/google-login',userData)
}

export const userEditAPI = async(userId,userData)=>{
    return await apiService("PUT",`/edituser/${userId}`,userData)
}

export const userDetailsUpdateAPI = async(userId,userData)=>{
    return await apiService("PUT",`/extradetails/${userId}`,userData)
}

export const myBookingsAPI=async(userId,reqBody)=>{
    return await apiService("GET",`/mybookings/${userId}`,{})
}

export const updateBookingsAPI=async(reqBody)=>{
    return await apiService("PUT",'/payment',reqBody)
}