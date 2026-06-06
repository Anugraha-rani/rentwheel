import React, { useEffect, useState } from 'react'
import { useFormik } from "formik";
import * as Yup from "yup";

function Edit() {
    const [showUpdateProfile, setShowUpdateProfile] = useState(false)
    const[dp,setDp] = useState("")
        const[username,setUsername] = useState("")
        const [userDetails,setUserDeatils] = useState({
            username:"",picture:"",role:"",id:"",address: "",phone: "",idType: "",idNumber: ""
        })
        const [preview,setPreview] = useState("")
            const[imageFileType,setImageFileType] = useState(false)

            const [existingPicture,setExistingPicture] = useState("")
                useEffect(()=>{
                    if(sessionStorage.getItem("user")){
                        const user = JSON.parse(sessionStorage.getItem("user"))
                        setUserDeatils({...userDetails,username:user.username,role:user.role,id:user._id,address: user.address, phone: user.phone , idType: user.idType , idNumber: user.idNumber })
                        setExistingPicture(user.picture)
                    }
                },[])

                useEffect(()=>{
                    if(sessionStorage.getItem("token") && sessionStorage.getItem("user")){
                        const user = JSON.parse(sessionStorage.getItem("user"))
                        setDp(user?.picture)
                        setUsername(user?.username)
                    }
                })
                
                const handleFileUpload=(e)=>{
                  console.log(e.target.files[0])
                  const imageFile = e.target.files[0]
                  if(imageFile.type.startsWith("image/")){
                setUserDeatils({...userDetails,picture:e.target.files[0]})
                 const url = URL.createObjectURL(e.target.files[0])
                  setPreview(url)
                  setImageFileType(true)
                  }else{
                    setImageFileType(false)
                  }
                  
                }
                const handleUserUpdate=async()=>{
  const{username,picture,role,id,address,phone,idType,idNumber}=userDetails
  if(!username){
     toast.error("Please fill the form completely")
  }else{
   const reqBody = new FormData()
   for(let key in userDetails){
    if(key != 'picture'){
      reqBody.append(key,userDetails[key])
    }else{
      preview?reqBody.append("picture",picture):reqBody.append("picture",existingPicture)
    }
   }
  //  api call
  const result = await userEditAPI(id,reqBody)
  console.log(result)
  if(result.status==200){
    toast.success("User profile updated successfully")
    setTimeout(()=>{
      
      navigate('/login')
    },2500)

  }
  }
}
  return (
    <div>
{showUpdateProfile && (
  <div className="fixed inset-0 bg-black/40 flex justify-center items-center z-50">
    <div className="bg-white w-[95%] max-w-md rounded-2xl p-6 shadow-xl">
      
      {/* Title */}
      <h2 className="text-lg font-semibold mb-5">
        Update profile
      </h2>

      {/* Upload Section */}
      <div className="flex items-center gap-4 mb-6">
        <label className="cursor-pointer text-sm font-medium text-blue-600 hover:underline" htmlFor="profile">
        <input type="file" hidden id="profile"/>

        {
                      existingPicture==""?
                    <img className="border border-gray-300 z-52"style={{width:'100px', height:'100px',borderRadius:'50%'}} src={preview?preview:"https://www.pngmart.com/files/23/Profile-PNG-Photo.png"} alt="" />
                      : 
                      existingPicture.startsWith("https://lh3.googleusercontent.com")?
                      <img className="border border-gray-300 z-52"style={{width:'100px', height:'100px',borderRadius:'50%'}} src={preview?preview:existingPicture} alt="" />
                      :
                      <img className="border border-gray-300 z-52"style={{width:'100px', height:'100px',borderRadius:'50%'}} src={preview?preview:`${axiosInstance.defaults.baseURL}/uploads/${existingPicture}`} alt="" />
                    }
                    </label>
        
        

        <div>
          <label className="cursor-pointer text-blue-600">
          Upload
  <input type="file" hidden onChange={handleFileUpload}/>
</label>
<p className="text-xs text-gray-400 mt-1">
            Recommended size 1:1, up to 10MB.
          </p>
        </div>
      </div>

      {/* Form */}
      <form className="grid grid-cols-2 gap-4 mb-6">
        
        <div className="mb-6">
                <label className="text-sm text-gray-600">
                  Username
                </label>

                <input
                  type="text"
                  value={userDetails.username}
                  onChange={(e) => setUserDeatils({...userDetails,username:e.target.value})}
                  className="w-full mt-1 border rounded-lg px-3 py-2 outline-none focus:ring-2 focus:ring-gray-300"
                  placeholder="Enter username"
                />
              </div>
         <div>
    <label className="text-sm text-gray-600">
      Phone
    </label>

    <input
      type="text"
      value={userDetails.phone}
      onChange={(e) =>
        setUserDeatils({
          ...userDetails,
          phone: e.target.value
        })
      }
      className="w-full mt-1 border rounded-lg px-3 py-2 outline-none focus:ring-2 focus:ring-gray-300"
      placeholder="Enter phone number"
    />
  </div>
   <div>
    <label className="text-sm text-gray-600">
      Address
    </label>

    <textarea
      value={userDetails.address}
      onChange={(e) =>
        setUserDeatils({
          ...userDetails,
          address: e.target.value
        })
      }
      className="w-full mt-1 border rounded-lg px-3 py-2 outline-none focus:ring-2 focus:ring-gray-300"
      placeholder="Enter address"
      rows="3"
    />
  </div>
   <div>
    <label className="text-sm text-gray-600">
      ID Type
    </label>

    <select
      value={userDetails.idType}
      onChange={(e) =>
        setUserDeatils({
          ...userDetails,
          idType: e.target.value
        })
      }
      className="w-full mt-1 border rounded-lg px-3 py-2 outline-none focus:ring-2 focus:ring-gray-300"
    >
      <option value="">Select ID Type</option>
      <option value="Aadhar">Aadhar</option>
      <option value="Passport">Passport</option>
      <option value="Driving License">Driving License</option>
      <option value="PAN">PAN</option>
    </select>
     </div>

  {/* ID Number */}
  <div>
    <label className="text-sm text-gray-600">
      ID Number
    </label>

    <input
      type="text"
      value={userDetails.idNumber}
      onChange={(e) =>
        setUserDeatils({
          ...userDetails,
          idNumber: e.target.value
        })
      }
      className="w-full mt-1 border rounded-lg px-3 py-2 outline-none focus:ring-2 focus:ring-gray-300"
      placeholder="Enter ID number"
    />
  </div>


        
      </form>

      {/* Footer Buttons */}
      <div className="flex justify-end gap-3">
        <button
          onClick={() => setShowUpdateProfile(false)}
          className="px-4 py-2 text-sm rounded-lg hover:bg-gray-100"
        >
          Cancel
        </button>

        <button  onClick={handleUserUpdate} className="px-5 py-2 bg-blue-600 text-white rounded-lg hover:bg-gray-400">
          Save
        </button>
      </div>
    </div>
  </div>
)}
    </div>
  )
}

export default Edit